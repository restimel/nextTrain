<template>
    <div class="about">
        <h1>Objectif</h1>
        <p>Une page de test pour visualiser les horaires des trains d'une gare.</p>
        <h1>Information</h1>
        <p>Version: {{version}}</p>
        <p>Auteur: Restimel - 28 / 04 / 2019</p>
    </div>
</template>

<script>
import { version } from '../../package.json';

export default {
    name: 'about',
    data: function() {
        return {
            version: version,
        };
    },
};
</script>
