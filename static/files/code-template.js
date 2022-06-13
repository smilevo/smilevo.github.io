
    window.template = Handlebars.compile(`
    {{#each .}}
    <div class="row">
        <div class="col-lg-5" style="background-color: #33a5db; color: white; padding-top: 10px">
            <h1 class="card-heading">{{title}}</h1>
        </div>
    </div>
    <div class="card-body">
        <div class="card-columns">
            {{#each data}}
            <a href="{{url}}" target="_blank">
            <div class="card">
                <div class="card-header">
                    <h5>{{title}}</h5>
                </div>
                <div class="card-body">
                    <div style="width: 100%; text-align: center">
                        
                        <img class="project-image" src="{{imageURL}}"
                            alt="{{title}}">
                    </div>
                    <div class="card-text">
                        {{description}}
                    </div>
                </div>
                <div class="card-footer d-flex flex-row flex-wrap justify-content-center"
                    style="background-color: #33a5db">
                    {{#each author}}
                    <div>
                    <a href="{{url}}" target="_blank">
                        <img class="rounded-circle profile" alt="{{name}}" title="{{name}}"
                            src="{{image}}">
                    </a>
                    </div>
                    {{/each}}
                </div>
            </div>
            </a>
            {{/each}}
        </div>
    </div>
    {{/each}}`);
