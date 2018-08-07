<template>
    <div>
        <nav class="navbar is-success">
            <div class="container">
                <div class="navbar-brand">
                    <a class="navbar-item">
                        <h1 class="title white-font">Task Manager</h1>
                    </a>
                    <span class="navbar-burger burger" data-target="navbar-menu-hero" @click="dataShowNav = !dataShowNav" :class="{ 'is-active': dataShowNav }">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>
                </div>
                <div id="navbar-menu-hero" class="navbar-menu" :class="{ 'is-active': dataShowNav }">
                    <div class="navbar-end">
                        <a class="navbar-item" @click="dataActivNav = !dataActivNav" :class="{ 'is-active': dataActivNav }">
                            Project
                        </a>
                        <a class="navbar-item" @click="dataActivNav = !dataActivNav" :class="{ 'is-active': dataActivNav }">
                            Client
                        </a>
                        <div class="navbar-item has-dropdown is-hoverable">
                            <div class="navbar-link">
                                More
                            </div>
                            <div id="moreDropdown" class="navbar-dropdown ">
                                <a class="navbar-item " href="#">
                                    <div class="level is-mobile">
                                        <div class="level-left">
                                            <div class="level-item">
                                                <p>
                                                    <strong>Extensions</strong>
                                                    <br>
                                                    <small>Side projects to enhance Bulma</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <section class="hero is-success">
            <div class="hero-head">
                
            </div>
            <div class="hero-body">
                <div class="container">
                    <h2 class="subtitle"> It's just trello clone! </h2>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    data () {
        return {
            dataShowNav: false,
            dataActivNav: false
        }
    }   
}
</script>