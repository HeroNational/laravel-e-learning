<!DOCTYPE html>
<html>
<head>
  <title>Laravel 8 Qr Code Example</title>
</head>
<body>
<style>
    .qr-cont{
        height: {{$Qrsize}}px;
        width: {{$Qrsize}}px;
        position: relative;
    }
    .qr{
        padding: 5px;
        border-radius: 5px;
    }
    .logo-img,.qr{
        position: absolute;
    }
    .logo-img{
        padding:2px;
        border: 2px solid red;
        /*width: 24%;*/
        width: 20%;
        box-sizing: border-box;
        top:39%;
        border-radius: 50%;
        left:39%;
        z-index: 20000;
        background: aliceblue;
    }
</style>
<div class="qr-cont">
    <img class="logo-img" src="https://avatars.githubusercontent.com/u/52329673?v=4" alt="">
    <span class="qr">
        {!!
        QrCode::size($Qrsize)
        ->backgroundColor(255,255,255)
        ->generate('
            BEGIN:VCARD
            VERSION:4.0
            N:Takougoum FOKOU;Jacobin Daniel;;Monsieur;
            FN:TAKOUGOUM FOKOU Jacobin Daniel
            TITLE:Mr
            PHOTO;MEDIATYPE=image/gif:https://avatars.githubusercontent.com/u/52329673?v=4
            NICKNAME:HeroNational
            GENDER:Masculin
            ORG:Altechs Engineering;Stage
            ADR;TYPE=WORK:;;Ngousso\n Descente Eleveur;Yaoundé;Center;;Cameroun;PREF;QUOTED-PRINTABLE:;Stage Académique
            ADR;TYPE=HOME:;;;;;;Cameroun
            EMAIL;INTERNET:danieluokof@gmail.com
            TITLE;QUOTED-PRINTABLE:Stagiaire
            TEL;WORK:(+237) 657 675 216
            TEL;TYPE=HOME,VOICE:(+237) 657 675 216
            TEL;CELL:(+237) 657 675 216
            NOTE;QUOTED-PRINTABLE:Superbe dascription
            BDAY;value=date:2001-01-02
            URL;type=pref:https://t.me/heronational
            END:VCARD
        ')
        !!}
    </span>
</div>
</body>
</html>
