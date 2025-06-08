const templateDropdown = document.createElement('template');
templateDropdown.innerHTML = `
<style>
    .dropdown {
        position: relative;
        width: 400px;
        border-radius: 6px;
    }

    .selected {
        padding: 8px;
        border: 3px solid #333;
        border-radius: 6px;
        background: #f0f0f0;
        cursor: pointer;
        user-select: none;
        transition:  max-height 0.25s ease, padding 0.25s ease;

        }
        
    .selected.open {
        transition-delay: 0s; /* no delay when opening */
        border-bottom: 0;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .list {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        
        padding: 0;
        border: 3px solid #333;
            border-top: none;
        border-left: 3px solid #333;
        border-right: 3px solid #333;
        
        
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;

        background: white;
        z-index: 1000;

        max-height: 0;
        overflow: hidden;
        transition: max-height 0.25s ease;

        display: flex;
        flex-direction: column;

        pointer-events: none;

        opacity: 0;
        
    
    }

    .list.open {
    max-height: 300px; 
    pointer-events: auto;
    
        border-bottom: 3px solid #333;
        border-left: 3px solid #333;
        border-right: 3px solid #333;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        opacity: 1;

    }   

    .dropdown, .selected, .list {
        box-sizing: border-box;
    }
</style>


<div class="dropdown">
    <div class="selected" tabindex="0">Select...</div>
    <div class="list"><slot></slot></div>
</div>
`;

class Acordion extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(templateDropdown.content.cloneNode(true));

        this.selected = this.shadowRoot.querySelector('.selected');
        this.list = this.shadowRoot.querySelector('.list');

        this.toggleList = this.toggleList.bind(this);
        this.selectItem = this.selectItem.bind(this);
    }

    connectedCallback() {
        this.selected.addEventListener('click', this.toggleList);

        this.shadowRoot.querySelector('slot').addEventListener('click', e => {
        const item = e.target.closest('acordion-item');
        if (item) this.selectItem(item);
        });
    }

    toggleList() {
        this.list.classList.toggle('open');
        this.selected.classList.toggle('open');
    }

    selectItem(item) {
        this.selected.textContent = item.textContent;
        this.list.classList.remove('open');
        this.selected.classList.remove('open');
    }
}

customElements.define('acordion-element', Acordion);
