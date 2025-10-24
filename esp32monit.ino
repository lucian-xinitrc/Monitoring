#include <DHT.h>
#include <WiFi.h>
#include <HTTPClient.h>

#define DHTPIN 4
#define DHTTYPE 11

const char* ssid = "ArchNet";
const char* pass = "B4mbus3r-43";

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);

  WiFi.begin(ssid, pass);

  Serial.print("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.print("Connected");
  dht.begin();
}

void loop(){
  float t = dht.readTemperature();
  float h = dht.readHumidity();

  if(WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin("https://api.gethonis.com/arduino");
    http.addHeader("Content-Type", "application/json");
    String jsonData = "{\"temp\":\"" + String(t) + "\",\"humi\":\"" + String(h) + "\"}";

    int httpResponseCode = http.POST(jsonData);

    if(httpResponseCode > 0) {
      Serial.print("Response: ");
      Serial.println(httpResponseCode);
      Serial.println(http.getString());
    } else {
        Serial.print("Error: ");
        Serial.println(httpResponseCode);
    }
  }
  Serial.print("Temperature is: " + String(t) + " Humidity is: " + String(h));

  Serial.println("");

  delay(5000);
}