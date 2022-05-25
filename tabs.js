const tabList = document.querySelector('[role="tablist"]');
const tabs = document.querySelectorAll('[role="tab"]');

tabList.addEventListener('keydown', changeTabIndex);
tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel)
})

let tabFocus = 0;

function changeTabIndex(e) {
  const keyDownLeft = 37;
  const keyDownRight = 39;
  
  if( e.keyCode === keyDownLeft || e.keyCode === keyDownRight) {
    tabs[tabFocus].setAttribute('tabindex', -1);

    if( e.keyCode === keyDownRight) {
      tabFocus++;
      if( tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    }
    else {
      tabFocus--;
      if( tabFocus < 0) {
        tabFocus = tabs.length -1;
      }
    }
  }
  tabs[tabFocus].setAttribute('tabindex', 0);
  tabs[tabFocus].focus();
}

function changeTabPanel(e) {
  const targetTab = e.target;
  const targetImage = targetTab.getAttribute('data-image');
  const targetPanel = targetTab.getAttribute('aria-controls');

  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  /* aria-selected change */
  tabContainer
  .querySelector('[aria-selected="true"]')
  .setAttribute('aria-selected', false);
  targetTab.setAttribute('aria-selected', true);

  hideContent(mainContainer, '.images');
  showContent(mainContainer, [`#${targetImage}`]);
  
  hideContent(mainContainer, '[role="tabpanel"]');
  showContent(mainContainer, [`#${targetPanel}`]);

  function hideContent(parent, content) {
    parent.querySelectorAll(content).forEach((item) => { item.setAttribute('hidden', true)});
  }

  function showContent(parent, content) {
    parent.querySelector(content).removeAttribute('hidden');
  }

  // /* img show */
  // mainContainer.querySelectorAll('.images').forEach((item) => {item.setAttribute('hidden', true)});
  // mainContainer.querySelector(`#${targetImage}`).removeAttribute('hidden');

  // /* panel show */
  // mainContainer.querySelectorAll('.destination-info').forEach((item) => {item.setAttribute('hidden', true)});
  // mainContainer.querySelector(`#${targetPanel}`).removeAttribute('hidden');
  
}