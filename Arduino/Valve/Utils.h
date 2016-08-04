/*
  Utils.cpp - Utilities functions
*/

#ifndef _Utils_h
#define _Utils_h

#include <Regexp.h>
#include <avr/eeprom.h>



struct Valve{
  unsigned long time = 2;
  byte index; byte pivot = 0;bool state = 1;bool activated = 1;
  int turn=100;
};
struct Info{
  Valve vt[7];
  int num = 7;
  byte moteur=16;
  byte turn = 0;
};
extern Info info;

extern int version,versionR;


/* Useful Macros for converting elapsed time to a time_t */


/*============================================================================*/
/*  Arduino functions   */
void checkUpdate();
void writeInfo();
unsigned long toLong(String str);
/* date strings */ 


#endif /* _Time_h */
