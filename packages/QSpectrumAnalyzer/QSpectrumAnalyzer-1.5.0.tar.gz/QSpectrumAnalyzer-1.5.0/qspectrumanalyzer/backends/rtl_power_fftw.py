import subprocess, math, pprint, shlex

from PyQt4 import QtCore

from qspectrumanalyzer.backends import BaseInfo, BasePowerThread


class Info(BaseInfo):
    """rtl_power_fftw device metadata"""
    pass


class PowerThread(BasePowerThread):
    """Thread which runs rtl_power_fftw process"""
    def setup(self, start_freq, stop_freq, bin_size, interval=10.0, gain=-1,
              ppm=0, crop=0, single_shot=False, device=0, sample_rate=2560000):
        """Setup rtl_power_fftw params"""
        crop = crop * 100
        overlap = crop * 2
        freq_range = stop_freq * 1e6 - start_freq * 1e6
        min_overhang = sample_rate * overlap * 0.01
        hops = math.ceil((freq_range - min_overhang) / (sample_rate - min_overhang))
        overhang = (hops * sample_rate - freq_range) / (hops - 1) if hops > 1 else 0
        if bin_size > 2800:
            bin_size = 2800
        bins = math.ceil(sample_rate / (bin_size * 1e3))
        crop_freq = sample_rate * crop * 0.01

        self.params = {
            "start_freq": start_freq,
            "stop_freq": stop_freq,
            "freq_range": freq_range,
            "device": device,
            "sample_rate": sample_rate,
            "bin_size": bin_size,
            "bins": bins,
            "interval": interval,
            "hops": hops,
            "time": interval / hops,
            "gain": gain * 10,
            "ppm": ppm,
            "crop": crop,
            "overlap": overlap,
            "min_overhang": min_overhang,
            "overhang": overhang,
            "single_shot": single_shot
        }
        self.freqs = [self.get_hop_freq(hop) for hop in range(hops)]
        self.freqs_crop = [(f[0] + crop_freq, f[1] - crop_freq) for f in self.freqs]
        self.databuffer = {"timestamp": [], "x": [], "y": []}
        self.databuffer_hop = {"timestamp": [], "x": [], "y": []}
        self.hop = 0
        self.prev_line = ""

        print("rtl_power_fftw params:")
        pprint.pprint(self.params)
        print()

    def get_hop_freq(self, hop):
        """Get start and stop frequency for particular hop"""
        start_freq = self.params["start_freq"] * 1e6 + (self.params["sample_rate"] - self.params["overhang"]) * hop
        stop_freq = start_freq + self.params["sample_rate"] - (self.params["sample_rate"] / self.params["bins"])
        return (start_freq, stop_freq)

    def process_start(self):
        """Start rtl_power_fftw process"""
        if not self.process and self.params:
            settings = QtCore.QSettings()
            cmdline = [
                settings.value("executable", "rtl_power_fftw"),
                "-f", "{}M:{}M".format(self.params["start_freq"],
                                       self.params["stop_freq"]),
                "-b", "{}".format(self.params["bins"]),
                "-t", "{}".format(self.params["time"]),
                "-d", "{}".format(self.params["device"]),
                "-r", "{}".format(self.params["sample_rate"]),
                "-p", "{}".format(self.params["ppm"]),
            ]

            if self.params["gain"] >= 0:
                cmdline.extend(["-g", "{}".format(self.params["gain"])])
            if self.params["overlap"] > 0:
                cmdline.extend(["-o", "{}".format(self.params["overlap"])])
            if not self.params["single_shot"]:
                cmdline.append("-c")

            additional_params = settings.value("params", Info.additional_params)
            if additional_params:
                cmdline.extend(shlex.split(additional_params))

            self.process = subprocess.Popen(cmdline, stdout=subprocess.PIPE, stderr=subprocess.DEVNULL,
                                            universal_newlines=True)

    def parse_output(self, line):
        """Parse one line of output from rtl_power_fftw"""
        line = line.strip()

        # One empty line => new hop
        if not line and self.prev_line:
            self.hop += 1
            self.databuffer["x"].extend(self.databuffer_hop["x"])
            self.databuffer["y"].extend(self.databuffer_hop["y"])
            self.databuffer_hop = {"timestamp": [], "x": [], "y": []}

        # Two empty lines => new set
        elif not line and not self.prev_line:
            self.hop = 0
            self.data_storage.update(self.databuffer)
            self.databuffer = {"timestamp": [], "x": [], "y": []}

        # Get timestamp for new hop and set
        elif line.startswith("# Acquisition start:"):
            timestamp = line.split(":", 1)[1].strip()
            if not self.databuffer_hop["timestamp"]:
                self.databuffer_hop["timestamp"] = timestamp
            if not self.databuffer["timestamp"]:
                self.databuffer["timestamp"] = timestamp

        # Skip other comments
        elif line.startswith("#"):
            pass

        # Parse frequency and power
        elif line[0].isdigit():
            freq, power = line.split()
            freq, power = float(freq), float(power)
            start_freq, stop_freq = self.freqs_crop[self.hop]

            # Apply cropping
            if freq >= start_freq and freq <= stop_freq:
                # Skip overlapping frequencies
                if not self.databuffer["x"] or freq > self.databuffer["x"][-1]:
                    #print("  {:.3f} MHz".format(freq / 1e6))
                    self.databuffer_hop["x"].append(freq)
                    self.databuffer_hop["y"].append(power)
                else:
                    #print("  Overlapping {:.3f} MHz".format(freq / 1e6))
                    pass
            else:
                #print("  Cropping {:.3f} MHz".format(freq / 1e6))
                pass

        self.prev_line = line
