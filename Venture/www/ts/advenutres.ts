import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
    templateUrl: 'templates/adventures.html'
})
export class adventures {
    //constructor(private navCtrl: NavController) {

    //}

    getAdventure() {
        console.log("GET ADVENTURE");
        getSteps(loadAdventure, this.data("firststepid"));
    }
}