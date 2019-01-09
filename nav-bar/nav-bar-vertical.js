import { html } from './node_modules/lit-html/lit-html.js'
// import {html, render} from 'lit-html';


class NavBarVertical extends HTMLElement {

    static get observedAttributes() {
        return ['opened'];
    }

    constructor(evt) {
        super();
        this.open = false;
        this.posX = 0
        this.width=400;
        this.reveal=40;
        this.attachShadow({ mode: 'open' });
    }

    toggle() {
        this.open = !this.open;
        this.animate();
    }

    animate() {
        const nav = this.shadowRoot.querySelector('.nav-bar-vertical')
        if(this.open) {
            nav.style.transform = `translateX(0px)`;
        } else {
            nav.style.transform = `translateX(${(this.width-this.reveal) * -1}px)`;
        }
        requestAnimationFrame(this.animate.bind(this))
    }

    connectedCallback(evt) {
        const template = document.createElement('template')
        template.innerHTML = `
            <style>
                :host {
                    display:flex;
                } 
                
                ::slotted(*) {
                }

                .content {
                    display: flex;
                    flex-direction: column;
                    padding-top: 60px;
                    z-index:1;
                    color: var(--app-secondary-color,white);
                }
                
                .nav-bar-vertical {
                    display: flex;
                    position:fixed;
                    height: 100%;
                    width: ${this.width}px;
                    left: 0;
                    background-color: var(--app-primary-color,black);
                    overflow-x: hidden;
                    transform: translateX( ${ this.open ? 0 : ((this.width-this.reveal) * -1) }px);
                    transition: 0.2s;
                }
            </style>
            <div class="content">
            <slot></slot>
            </div>
            <div class="nav-bar-vertical">
            </div>
        `

        this.shadowRoot.appendChild(template.content.cloneNode(true));
        const nav = this.shadowRoot.querySelector('.nav-bar-vertical')
        // this.posX = nav.style.width*-1
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(attr, oldVal, newVal) {
        switch (attr) {
            case 'opened':
                this.open = newVal;
                break;
        }
    }
}

window.customElements.define('nav-bar-vertical', NavBarVertical);