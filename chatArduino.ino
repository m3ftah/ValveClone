#include <SoftwareSerial.h>
 
int bluetoothTx = 3;  // TX-O pin of bluetooth mate, Arduino D2
int bluetoothRx = 2;  // RX-I pin of bluetooth mate, Arduino D3
 
int led = 13;
 
int dataFromBt;
 
boolean lightBlink = false;
 
SoftwareSerial bluetooth(bluetoothTx, bluetoothRx);
 
void setup()
{
  Serial.begin(9600);  // Begin the serial monitor at 9600bps
  bluetooth.begin(115200);  // The Bluetooth Mate defaults to 115200bps
  bluetooth.print("$$$");  // Enter command mode
  delay(100);  // Short delay, wait for the Mate to send back CMD
  bluetooth.println("U,9600,N");  // Temporarily Change the baudrate to 9600, no parity
  // 115200 can be too fast at times for NewSoftSerial to relay the data reliably
  bluetooth.begin(9600);  // Start bluetooth serial at 9600
  pinMode(led, OUTPUT);
}
 
void loop()
{
 
  if (bluetooth.available()) // If the bluetooth sent any characters
  {
    // Send any characters the bluetooth prints to the serial monitor
    String message = bluetooth.readString();
    Serial.println(message);
 
    //Serial.println(dataFromBt);
    if (message == "1") {
      Serial.println("led on");
      digitalWrite(led, HIGH);
      bluetooth.println("1");
    }
    if (message == "0") {
      Serial.println("led off");
      digitalWrite(led, LOW);
      bluetooth.println("0");
    }
    if (message == "b") {
      Serial.println("a");
      lightBlink = true;
    } else {
      lightBlink = false;
    }
 
  }
 
  if (Serial.available()) // If stuff was typed in the serial monitor
  {
    bluetooth.print(Serial.readString());
 
  }
 
  // and loop forever and ever!
  if (lightBlink) {
    digitalWrite(led, HIGH);
    bluetooth.println("1");
    Serial.println("HIGH");
    delay(500);
    digitalWrite(led, LOW);
    bluetooth.println("0");
    Serial.println("LOW");
    delay(500);
  }

}
