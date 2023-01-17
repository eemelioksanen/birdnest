// a snapshot from the actual api
const textXML = `<report>
<deviceInformation deviceId="GUARDB1RD">
<listenRange>500000</listenRange>
<deviceStarted>2023-01-17T10:34:32.499Z</deviceStarted>
<uptimeSeconds>13494</uptimeSeconds>
<updateIntervalMs>2000</updateIntervalMs>
</deviceInformation>
<capture snapshotTimestamp="2023-01-17T14:19:25.825Z">
<drone>
<serialNumber>SN-Xi8QK_9-Ug</serialNumber>
<model>Altitude X</model>
<manufacturer>DroneGoat Inc</manufacturer>
<mac>9a:b9:12:a2:20:56</mac>
<ipv4>34.152.212.1</ipv4>
<ipv6>16ac:302b:de6f:cff4:51dd:bb10:c190:ef56</ipv6>
<firmware>1.3.8</firmware>
<positionY>227843.23567062212</positionY>
<positionX>374327.78284545965</positionX>
<altitude>4420.11115392747</altitude>
</drone>
<drone>
<serialNumber>SN-swBVR7pl2V</serialNumber>
<model>Altitude X</model>
<manufacturer>DroneGoat Inc</manufacturer>
<mac>56:92:a2:ff:2d:93</mac>
<ipv4>169.121.113.152</ipv4>
<ipv6>4220:5068:1630:b1cc:5fe5:ad0b:bd54:842d</ipv6>
<firmware>2.6.7</firmware>
<positionY>327708.88567284556</positionY>
<positionX>324316.94271942833</positionX>
<altitude>4196.295613921694</altitude>
</drone>
<drone>
<serialNumber>SN-7t_Oj4cK9G</serialNumber>
<model>Altitude X</model>
<manufacturer>DroneGoat Inc</manufacturer>
<mac>56:8e:b3:e6:93:29</mac>
<ipv4>1.238.214.139</ipv4>
<ipv6>ab04:4283:3904:fccb:2917:6882:fa38:a81f</ipv6>
<firmware>3.7.5</firmware>
<positionY>227708.92772136186</positionY>
<positionX>264316.40751215286</positionX>
<altitude>4996.364075162218</altitude>
</drone>
</capture>
</report>
`
// the drones in the api
// only the last drone violates the rules
const drones = [
  {
    serialNumber: { _text: 'SN-Xi8QK_9-Ug' },
    model: { _text: 'Altitude X' },
    manufacturer: { _text: 'DroneGoat Inc' },
    mac: { _text: '9a:b9:12:a2:20:56' },
    ipv4: { _text: '34.152.212.1' },
    ipv6: { _text: '16ac:302b:de6f:cff4:51dd:bb10:c190:ef56' },
    firmware: { _text: '1.3.8' },
    positionY: { _text: '227843.23567062212' },
    positionX: { _text: '374327.78284545965' },
    altitude: { _text: '4420.11115392747' },
  },
  {
    serialNumber: { _text: 'SN-swBVR7pl2V' },
    model: { _text: 'Altitude X' },
    manufacturer: { _text: 'DroneGoat Inc' },
    mac: { _text: '56:92:a2:ff:2d:93' },
    ipv4: { _text: '169.121.113.152' },
    ipv6: { _text: '4220:5068:1630:b1cc:5fe5:ad0b:bd54:842d' },
    firmware: { _text: '2.6.7' },
    positionY: { _text: '327708.88567284556' },
    positionX: { _text: '324316.94271942833' },
    altitude: { _text: '4196.295613921694' },
  },
  {
    serialNumber: { _text: 'SN-7t_Oj4cK9G' },
    model: { _text: 'Altitude X' },
    manufacturer: { _text: 'DroneGoat Inc' },
    mac: { _text: '56:8e:b3:e6:93:29' },
    ipv4: { _text: '1.238.214.139' },
    ipv6: { _text: 'ab04:4283:3904:fccb:2917:6882:fa38:a81f' },
    firmware: { _text: '3.7.5' },
    positionY: { _text: '227708.92772136186' },
    positionX: { _text: '264316.40751215286' },
    altitude: { _text: '4996.364075162218' },
  },
]

// pilot data of the above drones
const pilots = [
  {
    pilotId: 'P-CZNU0KDeC_',
    firstName: 'Mose',
    lastName: 'Corkery',
    phoneNumber: '+210901073364',
    createdDt: '2023-01-09T21:04:40.731Z',
    email: 'mose.corkery@example.com',
  },
  {
    pilotId: 'P-XX3zKnmjf5',
    firstName: 'Orin',
    lastName: 'Zulauf',
    phoneNumber: '+210537368974',
    createdDt: '2022-02-05T10:52:53.927Z',
    email: 'orin.zulauf@example.com',
  },
  {
    pilotId: 'P-pTZ2YHcbzi',
    firstName: 'Mellie',
    lastName: 'Aufderhar',
    phoneNumber: '+210203730226',
    createdDt: '2022-08-06T10:48:23.773Z',
    email: 'mellie.aufderhar@example.com',
  },
]
module.exports = { textXML, drones, pilots }
