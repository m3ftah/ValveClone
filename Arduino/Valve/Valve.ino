/*
 * Created by MEFTAH on 23/07/2016.
 * Examples : 
 *           t6=120 مدة السقي
 *           v1=40 فتح وغلق الصمام
 *           p3=14 رقم البيفو
 *           a2=0 تعطيل الصمام
 *           m2=60 مدة سقي مؤقت
 *           
 *           a2 عدد الصمامات
 *           m01:00 مدة التغيل
 *           p00:30 مدة مضخة الدواء 
 *           c00:15 بعد مضخة الدواء
 *           s10:00 ساعة
 *           r الحصول على معلومات
 */
#include "Utils.h"

const String CMD_INVALID="E16";
const byte pivots[] = {14,15,16,17,18};
const byte pins[] = {4,5,6,7,8,9,10};

int TRANSFO = 16;
int DIRECTION1 = 18;
int DIRECTION2 = 19;

char cmdReg[22] = "^(%a+)(%d)=(%d+)";
char turnReg[20] = "^v(%d)=(%d+)$";
char timeReg[20] = "^t(%d)=(%d+)$";
char pivotReg[20] = "^p(%d)=(%d+)$";
char activateReg[20] = "^a(%d)=(%d+)$";
char manualReg[20] = "^m(%d)=(%d+)$";

void setup() {
  Serial.begin(9600);
  checkUpdate();
}

void loop() {
  if (Serial.available()) parse(Serial.readString());
  
  for (int i=nextValve(info.turn);i<info.num;i=nextValve(info.turn)){   
    if (info.vt[i].activated){
      if (!info.vt[i].state){
        turnValve(i,1);
        setTurn(i,1);
      }
      turnOffOtherValves(i);
      if (info.vt[i].pivot != 0) digitalWrite(info.vt[i].pivot,0);
      Serial.print("t" + String(i+1) + "=" + String(info.vt[i].time) + "...");
      delaySerial(info.vt[i].time * 1000);
    }else{
      Serial.println("a" + String(i+1) + "=0...");
      info.turn = i;
    }
  }
}
void parse(String message){
   MatchState ms;
  char buf[message.length()+1];
  message.toCharArray(buf,message.length()+1);
  
  ms.Target(buf); 
  if (message == "p"){
    while(Serial.available()==0);
    Serial.readString();
  }else if (message == "r") repport();
  else if (ms.Match(cmdReg)){
    int valve = toLong(message.substring(1,2))-1;
    unsigned long val = toLong(message.substring(3));
    if(ms.Match(timeReg)) info.vt[valve].time = val;
    else if (ms.Match(turnReg)) info.vt[valve].turn = val;
    else if (ms.Match(activateReg)) info.vt[valve].activated = val;
    else if (ms.Match(manualReg)) manual(valve,val);
    writeInfo();
  }else Serial.println(CMD_INVALID);
}

void turnOffOtherValves(int valve){
  int i = 0;
  for (i=0;i<info.num;i++){
      if (i != valve){
        if (info.vt[i].state){
          turnValve(i,0);
          setTurn(i,0);
        }
        if (info.vt[i].pivot != 0) digitalWrite(info.vt[i].pivot,1);
      }
    }
}
void turnValve(byte v, bool state){
  Serial.print("s"+String(v+1) +"="+ String(state) + "..." );
  if (state){
    digitalWrite(DIRECTION2,0);
    digitalWrite(DIRECTION1,1);
    digitalWrite(TRANSFO,0);
    digitalWrite(v+2,0);
    delaySerial((unsigned long) info.vt[v].turn*1000);
    digitalWrite(v+2,1);
    digitalWrite(DIRECTION2,1);
    digitalWrite(TRANSFO,1);
  }else{
    digitalWrite(DIRECTION2,1);
    digitalWrite(DIRECTION1,0);
    digitalWrite(TRANSFO,0);
    digitalWrite(v+2,0);
    delaySerial((unsigned long) info.vt[v].turn*1000);
    digitalWrite(v+2,1);
    digitalWrite(DIRECTION1,1);
    digitalWrite(TRANSFO,1);
  }
}
void setTurn(byte v,bool state){
  if (state) info.turn = v;
  info.vt[v].state = state;
  writeInfo();
}
void delaySerial(unsigned long dur){
  Serial.println("t=" + String(dur));
  unsigned long start = millis();
  while (millis() - start < dur){
    if (Serial.available()) parse(Serial.readString());
  }
}
byte nextValve(byte i){
  i += 1;
  if ( i <info.num) return i;
  else return 0;
}
void repport(){
  Serial.print("Moteur : ");Serial.println(info.moteur);
  int i=0;
  for (i=0;i<info.num;i++){
    Serial.print("a");Serial.print(i+1);Serial.print("="); Serial.print(info.vt[i].activated);
    Serial.print("t");Serial.print(i+1);Serial.print("="); Serial.print(info.vt[i].time);
    Serial.print(",v");Serial.print(i+1);Serial.print("="); Serial.print(info.vt[i].turn);
    if (info.vt[i].pivot != 0){Serial.print(", pivot : ");Serial.print(info.vt[i].pivot);}
    if (info.vt[i].state) Serial.print("s=1"); else Serial.print("s=0"); 
    Serial.println();
  }
}
void manual(byte v,unsigned long t){
  if (!info.vt[v].state){
    turnValve(v,1);
    setTurn(v,1);
  }
  turnOffOtherValves(v);
  if (info.vt[v].pivot != 0) digitalWrite(info.vt[v].pivot,0);
  Serial.print("t" + String(v+1) + "=" + String(t) + "...");
  delaySerial(t * 1000);
}

