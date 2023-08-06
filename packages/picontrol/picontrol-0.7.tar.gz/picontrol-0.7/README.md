# Pi Control
-----------------
## Pi Control Install 
(Requires RetroPie, please see instructions to install RetroPie at https://retropie.org.uk)

## Warning!!! Installing the Pi Control Board on the incorrect pins on the Pi can damage your Pi!

1. Configure keyboard if not already done
  * up, down, left, right, start, select, a, and b are enough for now
2. In settings, connect to local network, choose “SHOW IP” and make a note of the IP address given to your Pi.
3. Press F4 on the keyboard to exit to the terminal.
4. Download and extract Pi Control archive

  ```bash
 wget https://github.com/jetechteam/picontrol/raw/master/setup.sh
 ```
5. Run installer

  ```bash
 sudo sh ./setup.sh
 ``` 
6. When prompted to reboot type “y” and hit enter.
7. After reboot you may now access Pi Control web app from any browser connected to same local network by typing in the IP address of the Pi.
  * Example: 192.168.1.25
  * Default Username: picontrol
  * Default Password: password
