/* POLYFILL */
(function templatePolyfill(d) {
    if('content' in d.createElement('template')) {
        return false;
    }
    
    var qPlates = d.getElementsByTagName('template'),
        plateLen = qPlates.length,
        elPlate,
        qContent,
        contentLen,
        docContent;
    
    for(var x=0; x<plateLen; ++x) {
        elPlate = qPlates[x];
        qContent = elPlate.childNodes;
        contentLen = qContent.length;
        docContent = d.createDocumentFragment();
        
        while(qContent[0]) {
            docContent.appendChild(qContent[0]);
        }
        
        elPlate.content = docContent;
    }
})(document);



const container = document.querySelector('#container');
const contentSwitcher = document.querySelector('.content-switcher');
const template = document.querySelector('#content-template');


const mapContent = {
    "films": template.content.querySelector('.films'),
    "channels": template.content.querySelector('.channels')
};


container.appendChild(mapContent['films']);
container.lastElementChild.classList.add('shown');


const isIdDifferent = (id) => {
    return !container.lastElementChild.classList.contains(id)
};

const changeShownSection = (id) => {
    container.lastElementChild.classList.remove('shown');
    container.removeChild(container.lastElementChild);
    container.appendChild(mapContent[id]);
    window.setTimeout(() => mapContent[id].classList.add('shown'), 50);
};

const removeTabsClass = (tabs) => {
    tabs.forEach((tab) => {
        tab.classList.remove('content-switcher-tab--active');
    })
};

const addTabActiveClass = (tab) => {
    tab.classList.add('content-switcher-tab--active');
};


for (let i = 0; i < contentSwitcher.children.length; i++) {
    let tabs = contentSwitcher.children;
    tabs[i].addEventListener('click', () => {
        let id = tabs[i].id;
        removeTabsClass(tabs);
        addTabActiveClass(tabs[i]);
        
        if (isIdDifferent(id)) {
            changeShownSection(id)
        }
    })
}