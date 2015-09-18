# SupportVine



#### folder structure:
The following are the main folders:
- components - contains all the states/routs the app has
- configs - holds states and app.js
- images - holds images
- shared - holds modules that does not only belong to one component.
- styles - hold styles

Both shared and component can have the following for each item:
- controllers
- directives
- filters
- services
- views

## Angular Directives

### svTeamMemberSelection (sv-team-member-selection)

#### Attributes:
- dropdownClass: [string|optional] with the css classes that will be applied to the dropdown element.
- buttonClass: [string|optional] with the css classes that will be applied to the button element.
- nullValue: [boolean|optional] representing if it should allow null selection. Sometimes the sellection neeeds to allow null selection.
- avatarSize : [integer|30] the size of the gravatar icon in pixels.

#### Events:
The main event is select and it exposes the $selectedMember variable
- select($selectedMember): It is called when a member is selected from the dropdown.

#### Example:
```html
<sv-team-member-selection
      title="Assign"
      select="assign({$task: task, $member: $selectedMember})"
      dropdown-class="pull-right"
    >
  <!-- This is why we love transclution! -->
  Assign
</sv-team-member-selection>
```

### svTask (sv-task)

#### Attributes:
- task: [task|required] the main task model wich will be represented by the directive.


#### Example:
```html
<!-- Combine it with other directives (ex. ng-repeat)-->
<sv-task
    ng-repeat="task in taskCase.tasks"
    task="task">
</sv-task>
```



