<!DOCTYPE html>
<html>
<head>
    <title>Nebu - Panasian Restaurant & Lounge</title>
    <script src="js/jquery.js"></script>
    <script src="js/bootstrap.bundle.js"></script>
    <script src="js/bootstrap.js"></script>
    <link href="https://fonts.googleapis.com/css?family=PT+Sans|Roboto+Mono|Titillium+Web" rel="stylesheet">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/bootstrap-reboot.css">
    <link rel="stylesheet" href="css/bootstrap-grid.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="container-fluid">
    <!--Transition-foreground-->
    <div class="transition-overlay" id="transition-overlay">
        <div style="text-align: center;">
            <div style="position: absolute; width: 100%; top:35vh;">
                <div style="text-align: center;">
                    <div><img src="res/nebulogo-big.gif" width="30%"></div>
                </div>
            </div>
            <div style="height: 35vh;"></div>

        </div>
    </div>
    <!--Background-->
    <div class="background">
        <div class="background-tint"></div>
        <video autoplay loop class="background-player" id="background-video"></video>
    </div>
    <div class="row" style="height: 100vh">
        <div class="col sidebar pl-3 pr-3">
            <!--Right toolbar-->
            <div class="row" style="height: 30vh;">
                <div class="col">
                    <div style="text-align: center;">
                        <img id="logo" style="display: block; cursor: pointer;" src="res/nebusign.gif"
                             title="Click to go back to NEBU homepage" onclick="transition('welcome', null, false)"></img>
                    </div>
                </div>
            </div>
            <div style="height: 40px;"></div>
            <div id="nav" class="row h-25 text-center">
                <nav class="col stroke">
                    <div class="row">
                        <div class="col"><p class="h3 underline no-select" onclick="transition('restaurant',null, false);">
                                restaurant</p></div>
                    </div>
                    <div class="row">
                        <div class="col"><p class="h3 underline no-select" onclick="transition('grill',null, false);">grill</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col"><p class="h3 underline no-select" onclick="transition('bar',null, false);">bar</p></div>
                    </div>
                    <div class="row">
                        <div class="col"><p class="h3 underline no-select" onclick="transition('shisha',null, false);">shisha</p>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <div class="col-2 pl-3 pr-3">
            <div class="row" style="height: 30vh;"></div>
            <div class="row">
                <div class="col">
                    <!--Left bar-->

                </div>
            </div>
        </div>
        <div class="col">
            <!--Content bar-->
            <div class="row" style="height: 30vh;">
                <div class="col">
                    <div class="page-title" style="white-space: nowrap; text-decoration: none;">
                        <h3 id="page-title" class="navbar-element no-select" onclick="transitionSubpage('main')">title</h3>
                        <div id="page-sublinks" style="display: inline;">
                        </div>
                    </div>
                </div>
            </div>
            <div style="height: 15px;"></div>
            <div class="row h-25 text-left">
                <div class="col" id="content">

                </div>
            </div>
        </div>
        <div class="col-2 pl-3 pr-3">
            <div class="row" style="height: 30vh;"></div>
            <div class="row">
                <div class="col">
                    <!--Pictures bar-->

                </div>
            </div>
        </div>

    </div>
</div>
<script src="js/pageManager.js"></script>
</body>
</html>


<?php
/**
 * Created by PhpStorm.
 * User: matir
 * Date: 24.09.2018
 * Time: 18:02
 */