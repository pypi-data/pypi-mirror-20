# clustaar.authorize

[![Build Status](https://travis-ci.org/Clustaar/clustaar.authorize.svg?branch=master)](https://travis-ci.org/Clustaar/clustaar.authorize)
[![Code Climate](https://codeclimate.com/github/Clustaar/clustaar.authorize/badges/gpa.svg)](https://codeclimate.com/github/Clustaar/clustaar.authorize)

## Description

A micro authorization system.

Definition of the access rules is up to you as it's too much specific of a project.

It can be used with **Falcon**, just use the `@authorize` decorator and be sure to provide an `ability` property on the request context.

## Examples
### Usage
#### Creating authorizations

```python
from clustaar.authorize import Action, Ability, Authorizations

class AdminAuthorizations(Authorizations):
    def __init__(self):
        # Admins can do whatever they want
        super().__init__(default_action="allow")

class UserAuthorizations(Authorizations):
    def can_create_project(self):
        # Users can't create a project
        return False

    def can_view_project(self, id):
        # Users can only see project with ID = 1
        return id == "1"

user_ability = Ability(UserAuthorizations())
admin_ability = Ability(AdminAuthorizations())
create_action = Action(name="create_project")
view_action = Action(name="view_project")
```

#### Using authorizations

```python
admin_ability.can(view_action, id="1")  # => True
admin_ability.can(create_action)  # => True
admin_ability.authorize(view_action, id=1)  # => No exception raised
admin_ability.authorize(create_action)  # => No exception raised

user_ability.can(view_action, id="1")  # => True
user_ability.can(view_action, id="2")  # => False
user_ability.can(create_action) # => False
user_ability.authorize(view_action, id="1")  # => No exception raised
user_ability.authorize(create_action)  # => Raises an Exception : Access denied for create_project ({})
```

#### Falcon

```python
import falcon
from clustaar.authorize.falcon import authorize

class AbilityInjectionMiddleware(object):
    """
    Set the `ability` property from the request context.
    It choses the right ability depending on the user roles (if admin ability
    will be an AdminAbility, etc.)
    """
    def process_request(self, request, *args):
        # another middleware has injected current user in context
        user = request.context.user
        if user.has_role("admin"):
            authorizations = AdminAuthorizations()
        else:
            authorizations = UserAuthorizations(user)
        request.context.ability = Ability(authorizations)


class ProjectsHandler(object):
    @authorize(create_action)
    def on_post(self, request, response):
	    pass

class ProjectHandler(object):
    @authorize(view_action)
    def on_get(self, request, response, id):
	    pass

app = falcon.API(middlewares=(AbilityInjectionMiddleware(),))
app.add_route("/projects", ProjectsHandler())
app.add_route("/projects/{id}", ProjectHandler())
```
