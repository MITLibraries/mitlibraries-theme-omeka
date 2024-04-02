/*
This file relates to the filterable UI on the platform landing page. This
feature is described in the theme documentation at:

docs/reference/sites-filter.md
*/

const pluck = property => element => element[property];

var filter_values = new Array();
var visible_sites = 0;

function ApplyFilter( value ) {
    const grid = document.getElementById("site-grid").getElementsByClassName("site-wrapper");
    const live = document.getElementById("filter-live");
    $(grid).each(function() {
        let subjects = $(this).data("subject").split(" ");
        if ( subjects.includes(value) ) {
            $(this).removeClass('hidden');
            $(this).addClass('visible');
        } else {
            $(this).addClass('hidden');
            $(this).removeClass('visible');
        }
    });
    visible_sites = document.getElementsByClassName("site-wrapper visible").length;
    let quantity = visible_sites > 1 ? "exhibits" : "exhibit";
    live.innerHTML = `${visible_sites} ${quantity} in ${value}.`;
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
        let markup = `<button class="filter-button" value="${Hyphenate(value)}">${value}</button>`;
        filter.innerHTML += markup;
    });
}

function RenderSite( site ) {
    // This approach cribbed from https://gomakethings.com/html-templates-with-vanilla-javascript/
    const grid = document.getElementById("site-grid");
    site["dcterms:subject"].map(BuildFilter);
    let subjectlist = `All ${site["dcterms:subject"].map(pluck('@value')).map(Hyphenate).join(" ")}`;
    let img = ``;
    if ( site["thumbnail_display_urls"]["large"] ) {
        img = `<img src="${site["thumbnail_display_urls"]["large"]}" alt="${site["dcterms:description"][0]["@value"]}">`
    }
    let markup =
        `<li class="site-wrapper" data-subject="${subjectlist}">
          <a href="${site["bibo:uri"][0]["@id"]}" class="site">
            <span class="site-title">${site["o:title"]}</span>
            ${img}
          </a>
        </li>`;
    grid.innerHTML += markup;
};

function ResetFilters() {
    let filters = document.getElementsByClassName("filter-button");

    for (let i = 0; i < filters.length; i++) {
        filters[i].setAttribute('aria-pressed', 'false');
        $(filters[i]).removeClass('pressed');
    }
}

function UpdateFilter( e ) {
    e.setAttribute('aria-pressed', 'true');
    $(e).toggleClass('pressed');
}

function ActivateFilter() {
    let filters = document.getElementsByClassName("filter-button");

    for (let i = 0; i < filters.length; i++) {
        filters[i].addEventListener(
            "click",
            (event) => {
                ResetFilters();
                UpdateFilter(event.target);
                ApplyFilter(event.target.value);
            },
            false,
        );
    }
};

function LoadItemSet( id ) {
    let url = `/api/items?item_set_id=${id}`;
    document.getElementById("site-grid").innerHTML = "";
    $.get( url, function( data ) {
        data.map(RenderSite);
    }).done(function() {
        RenderFilter();
        ActivateFilter();
        ApplyFilter('All');
    });
}
