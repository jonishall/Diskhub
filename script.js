const laskurinappi=document.getElementById("nappi");
laskurinappi.addEventListener("click",laske);
function laske(){
summa=0;
for (let i=0; i<18; i++){
apu=i+1
s="reika"+apu;
summa+=parseInt(document.getElementById(s).value);
}
tulos.innerHTML=summa
}