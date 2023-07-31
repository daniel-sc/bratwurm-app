<template>
  <div class="about">
    <h1 class="h1">Bratwurm App</h1>
    <p>
      Mit dieser Anwendung können Wahrscheinlichkeiten zum Spiel "Heckmeck am
      Bratwurmeck" berechnet werden.
    </p>
    <h2 class="h2">Notation</h2>
    <p>
      Die Wahrscheinlichkeiten 0% und 100% werden als <strong>0</strong> und
      <strong>1</strong> dargestellt. Alle anderen Wahrscheinlichkeiten werden
      mit einer Nachkommastelle angegeben, wobei das Komma weg gelassen wird.
      Zum Beispiel wird die Wahrscheinlichkeit 4,2% als
      <strong>042</strong> dargestellt.
    </p>
    <p>
      Die <strong>FW</strong> (Fehlwurf) Wahrscheinlichkeit bezieht sich ausschliesslich
      auf den nächsten Wurf - nachdem die Würfel der entsprechenden Spalte
      herausgelegt wurden.
    </p>
    <p>
      Die Wahrscheinlichkeiten der Bratwürmer beziehen sich darauf (mit der
      Herausnahme der Würfel dieser Zeile) direkt oder in einem der folgenden
      Würfe <strong>mindestens</strong> die für diese Bratwurmanzahl benötigte
      Anzahlan Augen zu würfeln. Zum Beispiel bei
      <SingleWorm class="inline" :count="2"></SingleWorm>
      mindestens 25 Augen zu würfeln.
    </p>
    <h2 class="h2">Kontakt + Links</h2>
    <p>
      Feedback, Fragen, Anregungen, Fehlermeldungen gerne per Email:
      <a href="mailto:d8schreiber@gmail.com">d8schreiber@gmail.com</a>
    </p>
    <p class="center">
      <a href="http://heckmeckbuch.nutsaboutstats.com">
        Basistabellen Bratwurm (PDF/Buch)
      </a>
      /
      <a href="https://github.com/daniel-sc/bratwurm-app"> GitHub Projekt </a>
    </p>
    <router-link class="nav" to="/">Zurück zur App</router-link>
  </div>
</template>

<style>
.about {
  min-height: 100vh;
  margin: var(--dist-middle);
}

.h1 {
  font-size: 2rem;
  line-height: 4rem;
  margin-bottom: var(--dist-middle);
}

.h2 {
  font-size: 1.6rem;
  line-height: 3.2rem;
  margin-bottom: var(--dist-middle);
}

.nav {
  display: block;
  text-align: center;
  margin-top: var(--dist-middle);
  font-size: var(--font-size-small);
}

.inline {
  display: inline-flex;
}
.center {
  text-align: center;
}
</style>
<script setup lang="ts">
import SingleWorm from "@/components/SingleWorm.vue";
</script>
