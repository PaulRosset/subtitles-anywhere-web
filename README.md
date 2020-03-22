# <img src="src/medias/icon.png" width="45" height="45" align="left"> SubAny

> A **Chrome extension** that allow you to provide **SRT**, **TTML**, **VTT**, or **SAMI** subtitles to any video on the web.

## Install

- [**Chrome** extension][https://chrome.google.com/webstore/detail/subany-web/japfodgakhloekokcjbapdodojbhnnkc] [<img valign="middle" src="https://img.shields.io/chrome-web-store/v/japfodgakhloekokcjbapdodojbhnnkc.svg?label=%20">][https://chrome.google.com/webstore/detail/subany-web/japfodgakhloekokcjbapdodojbhnnkc]

### Context

The streaming world has never been so exciting. Many companies are investing a large number of resources to deliver video on the web. This is changing how we get entertained.

However, depending on the country you live, you may face some limitations of right about specific video content that can be delivered. This also concerns subtitles.

To answer these problems, you can now provide your subtitles.
Thus, for example, if you stay in a country where the streaming provider can't have access to the captions you wish, you can use that extension.

This is also useful for people that don't like subtitles that the services are providing and so providing your captions.

### How it works ?

The magic behind is the [rx-player's tools](https://github.com/canalplus/rx-player).

Which will do the hard work:

- **Parse** the subtitles types in format that can be understand by Javascript
- **Display** the subtitles. It's using his own internal logic to display the subtitles at the right moment.

### How to use the extension

Using the **chrome-extension** is very easy to do.

Once downloaded the extension:

- You should go at the **Options** of the app (right click on the icon -> options).
- Then a popup will appear.
- Finally, you can follow on to display you own subtitles.

### Subtitles (SRT,TTML,VTT,SAMI)

We are currently supporting four differents types of subtitles:

- **SRT**:
  This is the most common type of subtitles on the web
  Ex:

  ```
  1
  00:00:01,600 --> 00:00:04,200
  English (US)

  2
  00:00:05,900 --> 00:00:07,999
  This is a subtitle in American English

  3
  00:00:10,000 --> 00:00:14,000
  Adding subtitles is very easy to do
  ```

- **TTML**:
  This is a subtitle that is expressed in XML markup language

  ```xml
  <tt xml:lang="en" xmlns="http://www.w3.org/ns/ttml"
    xmlns:tts="http://www.w3.org/ns/ttml#styling">
  <head>
  <layout>
   <region xml:id="rTop"    tts:origin="10% 10%" tts:extent="80% 20%"/>
   <region xml:id="rMiddle" tts:origin="10% 40%" tts:extent="80% 20%"/>
   <region xml:id="rBottom" tts:origin="10% 70%" tts:extent="80% 20%"/>
  </layout>
  </head>
  <body>
  <div xml:lang="en">
    <p begin="0.76s" end="3.20s" region="rTop">
      I sent a message to the fish:
    </p>
    <p begin="3.20s" end="6.61s" region="rMiddle">
      I told them "This is what I wish."
    </p>
    <p begin="6.61s" end="9.93s" region="r1Bottom">
      The little fishes of the sea,
    </p>
    <p begin="9.93s" end="12.35s" region="r2Middle">
      They sent an answer back to me.
    </p>
  </div>
  </body>
  </tt>
  ```

- **VTT**:
  Also know as **WEBVtt**

```
WEBVTT

00:00:00.500 --> 00:00:02.000
The Web is always changing

00:00:02.500 --> 00:00:04.300
and the way we access it is changing
```

- **SAMI**:

```
<SAMI>

<HEAD>
<TITLE>SAMI Example</TITLE>

<SAMIParam>
 Media {cheap44.wav}
 Metrics {time:ms;}
 Spec {MSFT:1.0;}
</SAMIParam>

<STYLE TYPE="text/css">
<!--
 P { font-family: Arial; font-weight: normal; color: white; background-color: black; text-align: center; }

 #Source {color: red; background-color: blue; font-family: Courier; font-size: 12pt; font-weight: normal; text-align: left; }

 .ENUSCC { name: English; lang: en-US ; SAMIType: CC ; }
 .FRFRCC { name: French;  lang: fr-FR ; SAMIType: CC ; }
-->
</STYLE>

</HEAD>

<BODY>

<!-- Open play menu, choose Captions and Subtiles, On if available -->
<!-- Open tools menu, Security, Show local captions when present -->

<SYNC Start=0>
 <P Class=ENUSCC ID=Source>The Speaker</P>
 <P Class=ENUSCC>SAMI 0000 text</P>

 <P Class=FRFRCC ID=Source>Le narrateur</P>
 <P Class=FRFRCC>Texte SAMI 0000</P>
</SYNC>

<SYNC Start=1000>
 <P Class=ENUSCC>SAMI 1000 text</P>
 <P Class=FRFRCC>Texte SAMI 1000</P>
</SYNC>

<SYNC Start=2000>
 <P Class=ENUSCC>SAMI 2000 text</P>
 <P Class=FRFRCC>Texte SAMI 2000</P>
</SYNC>

<SYNC Start=3000>
 <P Class=ENUSCC>SAMI 3000 text</P>
 <P Class=FRFRCC>Texte SAMI 3000</P>
</SYNC>

</BODY>
</SAMI>
```

### License

MIT
