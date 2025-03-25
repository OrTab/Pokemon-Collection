import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeMessage } from "../store/message/slice";
import { selectMessages } from "../store/message/selectors";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";
import { Text, IconButton } from "@chakra-ui/react";

const DEFAULT_DURATION = 2000;

export const Message = () => {
  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();

  const _removeMessage = useCallback(
    (id: string) => {
      dispatch(removeMessage(id));
    },
    [dispatch]
  );

  useEffect(() => {
    messages.forEach((message) => {
      const timer = setTimeout(() => {
        _removeMessage(message.id);
      }, message.duration || DEFAULT_DURATION);

      return () => clearTimeout(timer);
    });
  }, [messages, dispatch, _removeMessage]);

  return (
    <MessageContainer>
      <AnimatePresence mode='popLayout'>
        {messages.map((message) => (
          <MessageWrapper
            key={message.id}
            type={message.type || "default"}
            initial={{ opacity: 0, x: 100, scale: 0.3 }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 25,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
              transition: {
                duration: 0.2,
                ease: "easeOut",
              },
            }}
            layout
          >
            <Text fontSize='md' fontWeight='medium'>
              {message.text}
            </Text>
            <IconButton
              onClick={() => _removeMessage(message.id)}
              variant='ghost'
              size='sm'
              color='white'
              _hover={{ bg: "whiteAlpha.200" }}
              aria-label='Close notification'
            >
              <IoClose size={16} />
            </IconButton>
          </MessageWrapper>
        ))}
      </AnimatePresence>
    </MessageContainer>
  );
};

const MessageContainer = styled.div`
  position: fixed;
  top: 42px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 12px;
  pointer-events: none;
`;

const MessageWrapper = styled(motion.div)<{
  type: "error" | "success" | "default";
}>`
  min-width: 320px;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.1),
    0 4px 8px -4px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: auto;
  background-color: ${({ type }) =>
    type === "error"
      ? "rgba(220, 38, 38, 0.95)"
      : type === "success"
      ? "rgba(22, 163, 74, 0.95)"
      : "rgba(37, 99, 235, 0.95)"};
  color: white;
  backdrop-filter: blur(8px);
  border: 1px solid
    ${({ type }) =>
      type === "error"
        ? "rgba(255, 255, 255, 0.1)"
        : type === "success"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(255, 255, 255, 0.1)"};
`;
