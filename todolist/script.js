document.addEventListener("DOMContentLoaded", () => {
    const gorevInput = document.getElementById("gorevInput");
    const ekleBtn = document.getElementById("ekleBtn");
    const gorevListesi = document.getElementById("gorevListesi");

    ekleBtn.addEventListener("click", gorevEkle);
});


function gorevekle(){ 
    const gorevMetni = gorevInput.ariaValueMax.trim();
    if (gorevMetni == " ")
        return;

    const yeniGorev = document.createElement("li");
    yeniGorev.textContent = gorevMetni;

    const tamamlaBtn=document.createElement("button");
    tamamlaBtn.textContent = "Tamamlandı";
    tamamlaBtn.style.marginLeft="10px";
    tamamlaBtn.addEventListener("click", () => {
        yeniGorev.classList.toggle("tamamlandi");
    
});

const silBtn = document.createElement("button");
silBtn.textContent = "Sil";
silBtn.style.marginLeft = "10px";
silBtn.addEventListener("click", () => {
    gorevListesi.removeChild(yeniGorev);
    });

    yeniGorev.appendChild(tamamlaBtn);
    yeniGorev.appendChild(silBtn);
    gorevListesi.appendChild(yeniGorev);

    gorevInput.value = "";

}
