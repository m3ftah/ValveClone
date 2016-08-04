#include <SoftwareSerial.h>
 
int bluetoothTx = 3;  // TX-O pin of bluetooth mate, Arduino D2
int bluetoothRx = 2;  // RX-I pin of bluetooth mate, Arduino D3
 
int led = 13;
 
int dataFromBt;
 
boolean lightBlink = false;
 
 
void setup()
{
  Serial.begin(9600);  // Start Serial serial at 9600
  pinMode(led, OUTPUT);
}

void loop()
{
 
  if (Serial.available()) // If the Serial sent any characters
  {
    // Send any characters the Serial prints to the serial monitor
    String message = Serial.readString();
    Serial.println(message);
 
    //Serial.println(dataFromBt);
    if (message == "1") {
      Serial.print("led on");
      digitalWrite(led, HIGH);
    }
    if (message == "0") {
      Serial.print("led off");
      digitalWrite(led, LOW);
    }
    if (message == "b") {
      Serial.print("a");
      lightBlink = true;
    } else {
      lightBlink = false;
    }
 
  }
 
 
  // and loop forever and ever!
  if (lightBlink) {
    digitalWrite(led, HIGH);
    Serial.print("1");
    Serial.print("HIGH");
    delay(500);
    digitalWrite(led, LOW);
    Serial.print("0");
    Serial.print("LOW");
    delay(500);
  }

}
