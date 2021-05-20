const forEach = (nodeList, callback, scope) => {
  for (let index = 0; index < nodeList.length; index++) {
    callback.call(scope, nodeList[index], index);
  }
};

const getDropdownToggle = dropdown => dropdown.querySelector('.header-main-navigation-toggle');

// see ya later dropdowns
const escapeDropdowns = (event) => {
  
  // if the user clicked anywhere or hit the escape key
  if (event.type === 'click' || 'key' in event && event.key === 'Escape') {
    
    const openDropdowns = document.querySelectorAll('.header-main-navigation-item--dropdown.header-main-navigation-item--open');

    console.log(openDropdowns)
    
    // close all the dropdowns (but don't move focus if the event was a click)
    forEach(openDropdowns, (dropdown) => closeDropdown(dropdown, event.type !== 'click'));
  }
};


const openDropdown = (dropdown) => {
  
  const dropdownToggle = getDropdownToggle(dropdown);
  // there is no sibling selector, so we jump to the parent and do a query
  const openSiblingDropdowns = dropdown.parentNode.querySelectorAll('.header-main-navigation-item--dropdown.dropdown.header-main-navigation-item--open');
  

  
  // first we'll close the other open dropdowns
  forEach(openSiblingDropdowns, (dropdown) => closeDropdown(dropdown, false));
  
  // finally, set aria-expanded to true and add the open class
  dropdownToggle.setAttribute('aria-expanded', true);
  dropdown.classList.add('header-main-navigation-item--open');
};

const toggleDropdown = function toggleDropdown(event) {

  const dropdown = this.parentNode;
  
  event.stopPropagation();
  
  if (dropdown.classList.contains('header-main-navigation-item--open')) {
    closeDropdown(dropdown);
  } else {
    openDropdown(dropdown);
  }
};

// close the dropdown
const closeDropdown = (dropdown, moveFocus = true) => {
  const dropdownToggle = getDropdownToggle(dropdown);
  
  // set aria-expanded to false and remove the open class
  dropdownToggle.setAttribute('aria-expanded', false);
  dropdown.classList.remove('header-main-navigation-item--open');
  
  // move the focus back to the toggle if we're allowed to
  if (moveFocus) {
    dropdownToggle.focus(); 
  }
};

const readyNavigation = () => {
  const dropdownToggles = document.querySelectorAll('.header-main-navigation-toggle');

  forEach(dropdownToggles, (dropdownToggle) => {
    dropdownToggle.addEventListener('click', toggleDropdown);
  });

  // add the escape listener to close the dropdowns
  document.addEventListener('keyup', escapeDropdowns);
  // add the click listener to close the dropdowns
  document.addEventListener('click', escapeDropdowns);
  
}

window.addEventListener('load', (event) => {
  readyNavigation();
});

