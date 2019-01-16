import { html, LitElement } from 'lit-element';

class XUsers extends LitElement {
    constructor() {
        super();
    }

    onBeforeEnter(location, commands, router) {
        if (!firebase.auth().currentUser) {
            return commands.redirect('/')
        }
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
          });
        console.log('GOING INTO USERS')
    }

    render() {
        return html`
            <style>
                :root {
                    background-color: red;
                }
            </style>
            <div>ÅÄÖ</div>
        `
    }
}


customElements.define('x-users', XUsers);
