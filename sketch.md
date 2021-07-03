#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <RTClib.h>
#include <Wire.h>
#include <Preferences.h>

// See the following for generating UUIDs:
// https://www.uuidgenerator.net/

#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_TEMP_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"
#define CHARACTERISTIC_SOIL_UUID "b78a29ba-544d-4454-917a-96863dc41ad8"
#define CHARACTERISTIC_PUMP_UUID "c73cd065-7451-4af8-aff9-115306069a61"
#define CHARACTERISTIC_PUMPTIME_UUID "fc8dd0f8-f21b-4408-ab57-d8576acfd723"
#define CHARACTERISTIC_TIME_UUID "395d265d-4d6e-4207-b047-66e45af9d003"

// GPIO where the DS18B20 is connected to
const int oneWireBus = 4;     
// Setup a oneWire instance to communicate with any OneWire devices
OneWire oneWire(oneWireBus);
// Pass our oneWire reference to Dallas Temperature sensor 
DallasTemperature sensors(&oneWire);
RTC_DS3231 rtc;
Preferences preferences;

bool deviceConnected = false;

const int soilPin = 34;  
const int relayPin = 16;  

class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
    };

    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
    };
};

class MyPumpCallback: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *pCharacteristic) {
      std::string value = pCharacteristic->getValue();
      String foo = "1";
      if (value.length() > 0) {
        if(strcmp(value.c_str(), foo.c_str()) == 0) {
          digitalWrite(relayPin, HIGH);
        } else {
          digitalWrite(relayPin, LOW);
        }
      }
    }
};

class MyPumpTimeCallback: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *pCharacteristic) {
      std::string value = pCharacteristic->getValue();
      
      preferences.begin("time", false);
      preferences.putString("pumpTime", value.c_str());
      preferences.end();
    }
};

BLECharacteristic *temperatureCharacteristic = NULL;
BLECharacteristic *soilCharacteristic = NULL;
BLECharacteristic *pumpCharacteristic = NULL;
BLECharacteristic *pumpTimeCharacteristic = NULL;
BLECharacteristic *timeCharacteristic = NULL;

void setup() {
  Serial.begin(115200);
  Serial.println("Starting BLE work!");
  pinMode(relayPin, OUTPUT);

  // Start the DS18B20 sensor
  sensors.begin();

  // soil
  int soil = analogRead(soilPin);

  //rtc
  if (! rtc.begin()) {
    Serial.println("Couldn't find RTC");
    //while (1);
  }

  if (rtc.lostPower()) {
    Serial.println("RTC lost power, lets set the time!");
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
  }

  DateTime now = rtc.now();

  //BLE
  BLEDevice::init("Smartgarden");
  BLEServer *pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_UUID);
  
  temperatureCharacteristic = pService->createCharacteristic(
                                 CHARACTERISTIC_TEMP_UUID,
                                 BLECharacteristic::PROPERTY_READ |
                                 BLECharacteristic::PROPERTY_NOTIFY
                               );

  soilCharacteristic = pService->createCharacteristic(
                         CHARACTERISTIC_SOIL_UUID,
                         BLECharacteristic::PROPERTY_READ |
                         BLECharacteristic::PROPERTY_NOTIFY
                       );

  timeCharacteristic = pService->createCharacteristic(
                         CHARACTERISTIC_TIME_UUID,
                         BLECharacteristic::PROPERTY_READ |
                         BLECharacteristic::PROPERTY_NOTIFY
                       );

  pumpCharacteristic = pService->createCharacteristic(
                         CHARACTERISTIC_PUMP_UUID,
                         BLECharacteristic::PROPERTY_READ |
                         BLECharacteristic::PROPERTY_WRITE
                       );

  pumpTimeCharacteristic = pService->createCharacteristic(
                         CHARACTERISTIC_PUMPTIME_UUID,
                         BLECharacteristic::PROPERTY_READ |
                         BLECharacteristic::PROPERTY_WRITE
                       );

  pServer->setCallbacks(new MyServerCallbacks());
  pumpCharacteristic->setCallbacks(new MyPumpCallback());
  pumpTimeCharacteristic->setCallbacks(new MyPumpTimeCallback());

  sensors.requestTemperatures(); 
  float temp = sensors.getTempCByIndex(0);
  Serial.print(temp);
  Serial.println("ºC");

  Serial.print(soil);
  Serial.println("%");

  String timeStr = String(now.year(), DEC) + '/' + String(now.month(), DEC) + '/' + String(now.day(), DEC) + " " + String(now.hour(), DEC) + ':' + String(now.minute(), DEC) + ':' + String(now.second(), DEC);

  temperatureCharacteristic->setValue(temp);
  soilCharacteristic->setValue(soil);
  pumpCharacteristic->setValue("0");
  preferences.begin("time", false);
  pumpTimeCharacteristic->setValue(preferences.getString("pumpTime", "0").c_str());
  preferences.end();
  timeCharacteristic->setValue(timeStr.c_str());
  
  pService->start();
  // BLEAdvertising *pAdvertising = pServer->getAdvertising();  // this still is working for backward compatibility
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);  // functions that help with iPhone connections issue
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();
  Serial.println("Characteristic defined! Now you can read it in your phone!");
}

void loop() {
  sensors.requestTemperatures(); 
  DateTime now = rtc.now();
    
  float temp = sensors.getTempCByIndex(0);
  //int temp = random(10);
  int soil = analogRead(soilPin);
  String timeStr = String(now.year(), DEC) + '/' + String(now.month(), DEC) + '/' + String(now.day(), DEC) + " " + String(now.hour(), DEC) + ':' + String(now.minute(), DEC) + ':' + String(now.second(), DEC);

  if (deviceConnected) {
  
    temperatureCharacteristic->setValue(temp);
    soilCharacteristic->setValue(soil);
    timeCharacteristic->setValue(timeStr.c_str());
    
    temperatureCharacteristic->notify();
    soilCharacteristic->notify();
    timeCharacteristic->notify();
  }

  Serial.print(deviceConnected);
  Serial.println("Device");

  Serial.print(temp);
  Serial.println(" foo ºC");

  Serial.print(temperatureCharacteristic->getValue().c_str());
  Serial.println("ºC");

  Serial.print(soilCharacteristic->getValue().c_str());
  Serial.println(" Soil");

  Serial.print(pumpCharacteristic->getValue().c_str());
  Serial.println(" Pump");

  Serial.print(pumpTimeCharacteristic->getValue().c_str());
  Serial.println(" PumpTime");

  Serial.print(timeStr);
  Serial.println(" Time");
  
  delay(10000);
}