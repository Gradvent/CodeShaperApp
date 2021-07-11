import React from 'react';
import ReactDOM from 'react-dom';

function createPage(Component) {
    return {
        mountTo(element) {
            if (element) {
                ReactDOM.render(<Component />, element);
            }
            return Component
        },
        mountToElementById(elementId) {
            if (document.getElementById(elementId)) {
                ReactDOM.render(<Component />, document.getElementById(elementId));
            }
            return Component
        },
    }
}

export default createPage
