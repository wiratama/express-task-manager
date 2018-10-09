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
                        <router-link :to="{ name: 'admindashboard' }" class="navbar-item"  @click="dataActivNav = !dataActivNav" :class="{ 'is-active': dataActivNav }">
                            <span>Dashboard</span>
                        </router-link>
                        <div class="navbar-item has-dropdown is-hoverable">
                            <div class="navbar-link">
                                Project
                            </div>
                            <div id="moreDropdown" class="navbar-dropdown ">
                                <router-link :to="{ name: 'adminboard' }" class="navbar-item">
                                    <div class="level is-mobile">
                                        <div class="level-left">
                                            <div class="level-item">
                                                <p>
                                                    <strong>Board</strong>
                                                    <br>
                                                    <small>Project board</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                                <router-link :to="{ name: 'adminclient' }" class="navbar-item">
                                    <div class="level is-mobile">
                                        <div class="level-left">
                                            <div class="level-item">
                                                <p>
                                                    <strong>Client</strong>
                                                    <br>
                                                    <small>Project client</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                        <!-- <button class="button is-primary" data-show="quickview" data-target="quickviewDefault">Show quickview</button> -->
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

        <!-- <div id="quickviewDefault" class="quickview">
            <header class="quickview-header">
                <p class="title">Navigation</p>
                <span class="delete" data-dismiss="quickview"></span>
            </header>
            <div class="quickview-body">
                <aside class="menu">
                    <p class="menu-label">
                        <router-link :to="{ name: 'admindashboard' }" class="navbar-item"  @click="dataActivNav = !dataActivNav" :class="{ 'is-active': dataActivNav }">
                                    <span>Dashboard</span>
                                </router-link>
                    </p>
                    <p class="menu-label">
                        Project
                    </p>
                    <ul class="menu-list">
                        <li>
                            <router-link :to="{ name: 'adminboard' }" class="navbar-item">
                                <strong>Board</strong>
                                <br>
                                <small>Project board</small>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'adminclient' }" class="navbar-item">
                                <strong>Client</strong>
                                <br>
                                <small>Project client</small>
                            </router-link>
                        </li>
                    </ul>
                </aside>
            </div>
        </div> -->
    </div>
</template>
<script>
// import bulmaQuickview from 'bulma-extensions/bulma-quickview/dist/js/bulma-quickview.min.js'

export default {
    data () {
        return {
            dataShowNav: false,
            dataActivNav: false,
            // quickviews : []
        }
    },
    // mounted: function() {
    //         this.quickviews = bulmaQuickview.attach()
    // },
}
</script>