async function mystorePageInitial(){

    let itemList = JSON.parse(window.localStorage.getItem(`mystoreitems`));

    itemList.forEach( async (item) => {

        $(`#features > div > div `).append(`<div class="col-4 col-6-medium col-12-small">

                                            <section>
                                                <a href="#" class="image featured" onclick="itemPageController('${item.itemNo}')"><img src="/public/images/SimpleShop.png" alt="" /></a>
                                                <header>
                                                    <h3>${item.name}</h3>
                                                </header>
                                                <li><strong>price: ${item.price} eth</strong></li>
                                                <li><strong>status: ${item.status}</strong></li>
                                            </section>

                                            </div>`);
    });

    window.localStorage.clear();

}

async function mystorePageController(){

    if (await isAccountConnected() == false) {
        alert (`Detect you haven't connected with web3 extention`);
        return;
    }

    let itemList = await getOwnSrv();

    window.localStorage.setItem(`mystoreitems`, JSON.stringify(itemList));

    $('#features.child').remove();
    $('#features').load('mystore.html');

}