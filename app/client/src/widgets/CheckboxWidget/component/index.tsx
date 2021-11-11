import React from "react";
import styled from "styled-components";
import { ComponentProps } from "widgets/BaseComponent";
import { Alignment, Checkbox, Classes } from "@blueprintjs/core";
import { AlignWidget } from "widgets/constants";
import { ButtonBorderRadius } from "components/constants";
import { Colors } from "constants/Colors";
import { getBorderRadiusValue } from "widgets/WidgetUtils";

type StyledCheckboxProps = {
  rowSpace: number;
  backgroundColor: string;
  borderRadius: ButtonBorderRadius;
};

type StyledCheckboxContainerProps = {
  isValid: boolean;
};

const CheckboxContainer = styled.div<StyledCheckboxContainerProps>`
  && {
    align-items: center;
    display: flex;
    height: 100%;
    justify-content: flex-start;
    width: 100%;
    &.${Alignment.RIGHT} {
      justify-content: flex-end;
    }

    & .bp3-control-indicator {
      border: ${(props) =>
        !props.isValid && `1px solid ${props.theme.colors.error} !important`};
    }
  }
`;

export const StyledCheckbox = styled(Checkbox)<StyledCheckboxProps>`
  height: ${({ rowSpace }) => rowSpace}px;

  &.bp3-control input:checked ~ .bp3-control-indicator {
    background-color: ${({ backgroundColor }) =>
      `${backgroundColor || Colors.GREEN}`};
    background-image: none;
  }

  &.bp3-control input:disabled ~ .bp3-control-indicator {
    opacity: 0.5;
  }

  &.bp3-control.bp3-checkbox .bp3-control-indicator {
    border-radius: 0;
    border-radius: ${({ borderRadius }) => getBorderRadiusValue(borderRadius)};
  }
`;

class CheckboxComponent extends React.Component<CheckboxComponentProps> {
  render() {
    const checkboxAlignClass =
      this.props.alignWidget === "RIGHT" ? Alignment.RIGHT : Alignment.LEFT;

    return (
      <CheckboxContainer
        className={checkboxAlignClass}
        isValid={!(this.props.isRequired && !this.props.isChecked)}
      >
        <StyledCheckbox
          alignIndicator={checkboxAlignClass}
          backgroundColor={this.props.backgroundColor}
          borderRadius={this.props.borderRadius}
          checked={this.props.isChecked}
          className={
            this.props.isLoading ? Classes.SKELETON : Classes.RUNNING_TEXT
          }
          disabled={this.props.isDisabled}
          label={this.props.label}
          onChange={this.onCheckChange}
          rowSpace={this.props.rowSpace}
        />
      </CheckboxContainer>
    );
  }

  onCheckChange = () => {
    this.props.onCheckChange(!this.props.isChecked);
  };
}

export interface CheckboxComponentProps extends ComponentProps {
  alignWidget?: AlignWidget;
  isChecked: boolean;
  isLoading: boolean;
  isRequired?: boolean;
  label: string;
  onCheckChange: (isChecked: boolean) => void;
  rowSpace: number;
  backgroundColor: string;
  borderRadius: ButtonBorderRadius;
}

export default CheckboxComponent;
