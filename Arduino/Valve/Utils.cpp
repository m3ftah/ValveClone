/*
  Utils.cpp - Utilities functions
*/

#if ARDUINO >= 100
#include <Arduino.h> 
#else
#include <WProgram.h> 
#endif
#include "Utils.h"


Info info;

unsigned long toLong(String str){
    char tarray[20];
    //Serial.println(str); 
    str.toCharArray(tarray, sizeof(tarray));
    return atol(tarray);
}

void checkUpdate(){
 int version = 4,versionR =2;
 delay(10);
 eeprom_read_block(&versionR, (uint16_t*)0, sizeof(versionR));
 delay(10);
 if (versionR != version){
    versionR = version;
    eeprom_write_block(&versionR, (uint16_t*)0, sizeof(versionR));
    delay(10);
    writeInfo();
 }else eeprom_read_block(&info, (uint16_t*)100, sizeof(info));
}

void writeInfo(){
  delay(10);
  eeprom_write_block(&info, (uint16_t*)100, sizeof(info));
  delay(10);
}
