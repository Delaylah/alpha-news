import styled from "@emotion/styled";
import React, { FC } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  id:string;
  isShowing: boolean;
  hide: (id:string) => void;
  deleteConfirmed: (id:string)=>void;
}

const ConfirmationModal: FC<ModalProps> = ({ isShowing, hide, id, deleteConfirmed}) => {

  function closeDialog(){
    hide(id);
    deleteConfirmed(id);
  }

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <ModalWrapper id="popup-modal" onDoubleClick={()=>hide(id)}>
            <Modal>
              <Text>Please dont delete me i will really good post!</Text>
              <div style={{display:"flex"}}>
              <Button color="green" onClick={()=>hide(id)}>I will let you live!</Button> 
              <Button color= "red" onClick={closeDialog}>You go down!</Button></div>
            </Modal>
          </ModalWrapper>
        </React.Fragment>,
        document.body
      )
    : null;
};
export default ConfirmationModal;

//#region Styles
const Button = styled.button`
  padding: 7px 7px;
  background-color:  ${props => props.color};
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  padding: 10px;
  margin: 0 auto;
  border-radius: 5px;
`;

const Text = styled.h3`
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 10px;
`;
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  height: 100%;
  right: 0;
  left: 0;
  z-index: 50;
  padding: 10px;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  border-radius: 4px;
  width: 100%;
`;

const Modal = styled.div`
  position: relative;
  width: 100%;
  padding: 10px;
  max-width: 400px;
  margin: 0 auto;
  background-color: white;
  top: 33%;
  z-index: 60;
  border-radius: 4px;
`;

//#endregion 