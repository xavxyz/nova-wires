import { Components, registerComponent, withMessages } from 'meteor/nova:core';
import React, { PropTypes, Component } from 'react';
import { intlShape } from 'react-intl';
import Wires from "../collection.js";

const WiresNewForm = (props, context) => {
  return (
    <Components.ShowIf check={Wires.options.mutations.new.check}>
      <div className="posts-new-form">
        <Components.SmartForm
          collection={Wires}
          prefilledProps={props.prefilledProps || {}}
          successCallback={wire => {
            props.flash(context.intl.formatMessage({id: "wires.created_message"}), "success");
          }}
        />
      </div>
    </Components.ShowIf>
  );
};

WiresNewForm.propTypes = {
  flash: React.PropTypes.func,
};

WiresNewForm.contextTypes = {
  intl: intlShape
};

WiresNewForm.displayName = "WiresNewForm";

registerComponent('WiresNewForm', WiresNewForm, withMessages);