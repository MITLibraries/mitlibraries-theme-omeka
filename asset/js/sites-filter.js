const pluck = property => element => element[property];

var filter_values = new Array();

function ApplyFilter( value ) {
    const grid = document.getElementById("site-grid").getElementsByClassName("site-wrapper");
    $(grid).each(function() {
        subjects = $(this).data("subject").split(" ");
        if ( subjects.includes(value) ) {
            $(this).removeClass('hidden');
        } else {
            $(this).addClass('hidden');
        }
    })
}

function BuildFilter( value ) {
    if ( ! filter_values.includes( value["@value"] ) ) {
        filter_values.push( value["@value"] );
    }
}

function Hyphenate( string ) {
    return string.replace(/\s+/g, '-');
}

function RenderFilter() {
    const filter = document.getElementById("site-filter");
    filter_values.sort();
    $(filter_values).each(function(index, value) {
        markup = `<input id="${Hyphenate(value)}" type="radio" name="site-filter-value" value="${Hyphenate(value)}"><label for="${Hyphenate(value)}" class="btn button-secondary">${value}</label>`
        filter.innerHTML += markup;
    });
}

function RenderSite( site ) {
    // This approach cribbed from https://gomakethings.com/html-templates-with-vanilla-javascript/
    const grid = document.getElementById("site-grid");
    site["dcterms:subject"].map(BuildFilter);
    subjectlist = `All ${site["dcterms:subject"].map(pluck('@value')).map(Hyphenate).join(" ")}`;
    img = ``;
    if ( site["thumbnail_display_urls"]["large"] ) {
        img = `<img src="${site["thumbnail_display_urls"]["large"]}" alt="${site["dcterms:description"][0]["@value"]}">`
    }
    markup =
        `<div class="site-wrapper" data-subject="${subjectlist}">
          <a href="${site["bibo:uri"][0]["@id"]}" class="site">
            ${img}
            <span class="site-title">${site["o:title"]}</span>
          </a>
        </div>`;
    grid.innerHTML += markup;
};

function LoadItemSet( id ) {
    let url = `/api/items?item_set_id=${id}`;
    document.getElementById("site-grid").innerHTML = "";
    $.get( url, function( data ) {
        data.map(RenderSite);
    }).done(function() {
        RenderFilter();
    });
}
