window.template = Handlebars.compile(`
<div class="articles">
    <ul>
        {{#each .}}
            <li><span class="date">{{Date}} : </span> {{{Content}}} </li>
        {{/each}}
    </ul>
  </div>`);