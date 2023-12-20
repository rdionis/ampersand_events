import AmpersandRouter from 'ampersand-router';

export default AmpersandRouter.extend({
    routes: {
        'page/:pageId': 'handlePage',
        
        'category/special/*categoryName': 'handleSpecialCategoryPath',

        'category/*categoryName': 'handleCategoryPath',

        'items(/sort/sortDirection)(/order/sortOrder)': 'handleItemsList',

        '*defaultPath': 'handleDefault',
    },
  
    handlePage (pageId) {
        console.log('handlePage:', pageId)
    },

    handleCategoryPath (categoryPath) {
        console.log('handleCategoryPath', categoryPath)
    },
    handleSpecialCategoryPath(specialCategoryPath) {
        console.log('handleSpecialCategoryPath:', specialCategoryPath)
    },
    handleItemsList (sortDirection, sortOrder) {
        console.log('handleItemsList:', sortDirection, sortOrder)
    },
    handleDefault (currentPath) {
        console.log('handleDefault:', currentPath)
        return this.redirectTo('page/1')
    },

    initialize() {
        
        // creating a function that navigates to the next page when the key '+' is pressed
        const goToNextPage = () => {
            const currentURL = window.location.href;
        
            const pageId = currentURL.match(/\/page\/(\d+)/);
        
            let newPageId;

            try {
                if (pageId && pageId.length > 1) {
                    const currentPageId = parseInt(pageId[1], 10);
                    newPageId = currentPageId + 1;
                } else {
                    throw new Error("Invalid pageId");
                }
                
                this.navigate(`/page/${newPageId}`);
            } catch (error) {
                console.error("Error:", error);
            }
            
        };

        // creating a function that navigates to the previous page when the key '-' is pressed
        const goBackToPreviousPage = () => {
            const currentURL = window.location.href;
        
            const pageId = currentURL.match(/\/page\/(\d+)/);
        
            let newPageId;

            try {
                if (pageId && pageId.length > 1) {
                    const currentPageId = parseInt(pageId[1], 10);
                    if (currentPageId <= 1) {
                        // skip navigation if currentPageId is less than or equal to 1
                        return;
                    } else {
                        newPageId = currentPageId - 1;
                    }
                } else {
                    throw new Error("Invalid pageId");
                }
                
                this.navigate(`/page/${newPageId}`);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        
        // adding a 'keydown' event listener to implement navigation with the '+' and '-' keys
        document.addEventListener('keydown', e => {
            if (e.key === '+') goToNextPage();
            if (e.key === '-') goBackToPreviousPage();
        });
        
        // adding a 'click' event listener to reload the page
        document.addEventListener('click', () => {
            this.reload()
            console.log('Page is reloading.')
        });
    },
});