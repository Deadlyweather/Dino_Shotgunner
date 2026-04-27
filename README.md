Dinosaurus (pelaaja)
- Syö selvityäkseen ja kehittyäkseen
- Yrittää matkustaa mahdollisimman paljon oikealle
- Aloittaa alusta kuoleman jälkeen

Haulikko
- Käyttää neuloja ammuksina ja päivitys resurssina

Ammukset
- Pelaajan ammukset kulkevat valon nopeudella
- Vihollisten ammukset kulkevat melko nopeasti

Viholliset
- Lentolisko lentää kohti pelaajaa läpi kaiken
- Kaktus seisoo paikallaan ja ampuu neuloja pelaajaa kohti
- Kehittyy riippuen metrien määrästä

Maasto
- Loputon google aavikko, joka muuttuu jatkuvasti enemmän kaaottiseksi
- Synnyttää viholliset oikealle
- Enemmän erityis rakennuksia oikeammalla

Tony.ruotsalainen

- Olen ollut pelin idea miehenä tässä projektissa. Peli projektin tarkoituksena on näyttää että meillä on taitoa ja muuten kehittää yhteistyötä ja myös omaksi viihteeksi

Pelaaja

- Pelaaja on melkein täysin oma luoma. Sen grafiikka tulee png kuvasta jonka löysin kuva haulla, mutta olin repinyt ja jakanut kuvan moneen eri kehon osaan että voisin tehdä hassuja animaatioita. Olin antanut jokaiselle kuvalle rotaatio ja keskipiste attribuutteja parempaan hallintaa varten, jota olen käyttänyt paljon hyväkseni. Pelaaja on osa, jota olen käsitellyt eniten muista osista

- Haulikko on olemassa koska minun mielestä haulikot peli maailmassa ovat eeppisiä ja sen tarkoituksena on antaa ylivoiman tuntuman käyttäjälle, mutta päätin myös tehdä siitä aluksi heikon, koska haulikon päivitykset tuntuisivat enemmän voimakkailta myöhemmin ja koska tykkään "slowburn" elementistä. 
Haulikon grafiikka on melkein kokonaan oma, koska olin ottanut mallin netistä ja liimasin sen päälle metalli putkia ja osia hevosen jalasta.

Maailma

- Olen ollut osa maailman luonnissa. Kaikki sen grafiikat ovat minun luomia. Olen tehnyt päivän kierron, koska haluan että on aikoja jolloin pelaaja joutuu hidastumaan vaikeuden nousun takia ja aion tehdä muita tapahtumia, jotka vaikuttavat pelaajan edistymiseen.

Debug
- Olen lisännyt debugin asetteluja varten

Viholliset

- Lisäsin vihollisille dropit kuollessa ja muita pieniä lisäyksiä

Drop

- Tein koko droppi logiikan

PowerUp

- Muutin vain voimakkuutta

Menu

- Tein pelille menun

Eeri Mäntysalo:

HUD
- Tein peliin hudin, josta pelaaja näkee pelin kannalta tärkeitä tietoja
  
Collision
- Tein collisionista  funktiot checkgroundcollision ja checkobjectcollision. Checkground varmistaa, että pelaaja ei tipu maasta läpi. Checkobjectilla vertaillaan objekteja keskenään, ja sillä voi esimerkiksi tarkistaa osuuko pelaaja poweruppiin

Enemy
- Tein linnuille hyökkäämis logiikan, joka perustuu pelaajan seuraamiseen
- Tein kaktuksille logiikan, joka arpoo mitä ammutaan ja millä nopeudella vaikeustason mukaan
- Tein vihollisille skaalautuvuuden, eli joka vaikeustaso viholliset muuttuu vahvemmiksi

Upgrademenu
- Tein päivitysmenun pääosin itse, pelaaja pystyy sieltä resursseilla ostamaan erilaisia päivityksiä hahmoon ja haulikkoon

Powerup
- Tein powerup luokan, pelaajan lähelle syntyy 500m välein päivitys joka on randomilla valittu


