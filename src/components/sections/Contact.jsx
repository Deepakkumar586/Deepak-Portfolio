import React, { useRef, useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 60px 20px;
  min-height: 100vh;
  background: ${({ theme }) => theme.bg || '#0A0A0A'};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 50%, rgba(124, 58, 237, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 700px;
  gap: 24px;
  z-index: 2;
  position: relative;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
 color:white;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Desc = styled.p`
  font-size: 18px;
  text-align: center;
  color: ${({ theme }) => theme.text_secondary || 'rgba(255, 255, 255, 0.7)'};
  max-width: 500px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  background: rgba(17, 25, 40, 0.85);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(124, 58, 237, 0.2);
  padding: 40px;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(124, 58, 237, 0.4);
    box-shadow: 0 25px 45px rgba(124, 58, 237, 0.15);
  }
  
  @media (max-width: 768px) {
    padding: 24px;
    gap: 16px;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary || '#FFFFFF'};
  margin-left: 4px;
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ hasError, theme }) => 
    hasError ? '#EF4444' : 'rgba(124, 58, 237, 0.3)'};
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary || '#FFFFFF'};
  border-radius: 12px;
  padding: 14px 18px;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #7C3AED;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
    background: rgba(255, 255, 255, 0.08);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const Textarea = styled.textarea`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ hasError, theme }) => 
    hasError ? '#EF4444' : 'rgba(124, 58, 237, 0.3)'};
  outline: none;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary || '#FFFFFF'};
  border-radius: 12px;
  padding: 14px 18px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: #7C3AED;
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
    background: rgba(255, 255, 255, 0.08);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #C084FC 100%);
  padding: 14px 24px;
  border-radius: 12px;
  border: none;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  margin-top: 8px;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(124, 58, 237, 0.3);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  &:active::before {
    width: 300px;
    height: 300px;
  }
`;

const ErrorMessage = styled.span`
  color: #EF4444;
  font-size: 12px;
  margin-left: 4px;
`;

const SuccessMessage = styled.div`
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  color: #10B981;
  padding: 12px;
  border-radius: 12px;
  text-align: center;
  font-size: 14px;
  animation: slideIn 0.3s ease;
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Contact = () => {
  const form = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    const newErrors = {};
    
    if (!formData.get("from_name")?.trim()) {
      newErrors.from_name = "Name is required";
    } else if (formData.get("from_name")?.trim().length < 2) {
      newErrors.from_name = "Name must be at least 2 characters";
    }
    
    const email = formData.get("email_id")?.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email_id = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email_id = "Please enter a valid email address";
    }
    
    if (!formData.get("subject")?.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.get("subject")?.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }
    
    if (!formData.get("message")?.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.get("message")?.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.current) return;
    
    const formData = new FormData(form.current);
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setErrors({});
    setIsLoading(true);
    setSuccessMessage("");

    try {
      await emailjs.sendForm(
        "service_inn2nvr",
        "template_jb46glb",
        form.current,
        "1YZkGhfc--Ub1Q_T0"
      );
      
      setSuccessMessage("✨ Message sent successfully! I'll get back to you soon.");
      form.current.reset();
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      console.error("Error sending message:", error);
      setErrors({ submit: "Failed to send message. Please try again later." });
      
      // Clear error after 5 seconds
      setTimeout(() => setErrors({}), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container id="Contact">
      <Wrapper>
        <Title>Let's Connect</Title>
        <Desc>
          Have a project in mind or want to collaborate? 
          I'd love to hear from you!
        </Desc>
        
        <ContactForm ref={form} onSubmit={handleSubmit}>
          {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
          
          {errors.submit && <ErrorMessage>{errors.submit}</ErrorMessage>}
          
          <InputGroup>
            <Label>Your Name *</Label>
            <Input
              type="text"
              placeholder="John Doe"
              name="from_name"
              hasError={errors.from_name}
            />
            {errors.from_name && <ErrorMessage>{errors.from_name}</ErrorMessage>}
          </InputGroup>
          
          <InputGroup>
            <Label>Email Address *</Label>
            <Input
              type="email"
              placeholder="john@example.com"
              name="email_id"
              hasError={errors.email_id}
            />
            {errors.email_id && <ErrorMessage>{errors.email_id}</ErrorMessage>}
          </InputGroup>
          
          <InputGroup>
            <Label>Subject *</Label>
            <Input
              type="text"
              placeholder="Project Inquiry"
              name="subject"
              hasError={errors.subject}
            />
            {errors.subject && <ErrorMessage>{errors.subject}</ErrorMessage>}
          </InputGroup>
          
          <InputGroup>
            <Label>Message *</Label>
            <Textarea
              placeholder="Tell me about your project or question..."
              name="message"
              rows="5"
              hasError={errors.message}
            />
            {errors.message && <ErrorMessage>{errors.message}</ErrorMessage>}
          </InputGroup>
          
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Message"}
          </Button>
        </ContactForm>
      </Wrapper>
    </Container>
  );
};

export default Contact;