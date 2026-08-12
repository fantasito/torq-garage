import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react'

const DEFAULT_ACCENT = '#6366F1'
const DEFAULT_BUSINESS = 'our business'
const DEFAULT_WELCOME =
  "Hi! I'm AXON AI, your sales assistant. How can I help you today?"
const MODEL = 'claude-sonnet-4-20250514'
const API_URL = 'https://api.anthropic.com/v1/messages'

export interface WidgetConfig {
  businessName: string
  accentColor: string
  welcomeMessage: string
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

function getApiKey(): string {
  const win = window as Window & { __AXON_API_KEY__?: string }
  return (
    win.__AXON_API_KEY__ ||
    localStorage.getItem('axon-anthropic-api-key') ||
    ''
  )
}

export function getScriptConfig(): WidgetConfig {
  const scripts = document.querySelectorAll<HTMLScriptElement>(
    'script[data-business-name], script[data-accent-color], script[data-welcome-message], script[src*="widget"]',
  )
  let script: HTMLScriptElement | null = null
  for (const s of scripts) {
    if (s.src.includes('widget') || s.hasAttribute('data-business-name')) {
      script = s
      break
    }
  }
  if (!script) {
    script = document.currentScript as HTMLScriptElement | null
  }
  return {
    businessName:
      script?.getAttribute('data-business-name') ?? DEFAULT_BUSINESS,
    accentColor:
      script?.getAttribute('data-accent-color') ?? DEFAULT_ACCENT,
    welcomeMessage:
      script?.getAttribute('data-welcome-message') ?? DEFAULT_WELCOME,
  }
}

function buildSystemPrompt(businessName: string): string {
  return `You are AXON AI, a friendly and professional AI sales assistant for ${businessName}. You help potential customers understand products and services, answer questions, qualify leads, and guide them through the sales process. Be concise, helpful, and professional. Never mention you are Claude or made by Anthropic.`
}

const AI_BUBBLE_BG = '#F5F3FF'
const HEADER_GRADIENT =
  'linear-gradient(135deg, #6366F1, #8B5CF6)'

const widgetStyles = `
@keyframes axon-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
  30% { transform: translateY(-4px); opacity: 1; }
}
@keyframes axon-pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.55;
  }
  70%, 100% {
    transform: scale(1.75);
    opacity: 0;
  }
}
.axon-trigger-wrap {
  position: relative;
  width: 56px;
  height: 56px;
}
.axon-pulse-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid var(--axon-accent, #6366F1);
  animation: axon-pulse-ring 3s ease-out infinite;
  pointer-events: none;
}
.axon-send-btn {
  transition: all 200ms;
}
.axon-send-btn:hover:not(:disabled) {
  filter: brightness(0.88);
}
`

function ChatIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3C7.03 3 3 6.58 3 11c0 1.85.63 3.55 1.69 4.9L3 21l5.45-1.52C9.82 20.49 10.88 21 12 21c4.97 0 9-3.58 9-8s-4.03-8-9-8z"
        fill="white"
      />
      <circle cx="8.5" cy="11" r="1.2" fill="#6366F1" />
      <circle cx="12" cy="11" r="1.2" fill="#6366F1" />
      <circle cx="15.5" cy="11" r="1.2" fill="#6366F1" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TypingIndicator({ accentColor }: { accentColor: string }) {
  const dotStyle = (delay: string): CSSProperties => ({
    width: 7,
    height: 7,
    borderRadius: '50%',
    backgroundColor: '#9CA3AF',
    animation: 'axon-bounce 1.2s infinite ease-in-out',
    animationDelay: delay,
  })
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          backgroundColor: accentColor,
          color: 'white',
          fontSize: 10,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        AX
      </div>
      <div
        style={{
          backgroundColor: AI_BUBBLE_BG,
          borderRadius: 16,
          padding: '12px 16px',
          display: 'flex',
          gap: 5,
          alignItems: 'center',
        }}
      >
        <span style={dotStyle('0s')} />
        <span style={dotStyle('0.15s')} />
        <span style={dotStyle('0.3s')} />
      </div>
    </div>
  )
}

export default function Widget({
  businessName,
  accentColor,
  welcomeMessage,
}: WidgetConfig) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [welcomed, setWelcomed] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, typing, scrollToBottom])

  useEffect(() => {
    if (open && !welcomed) {
      setMessages([
        {
          id: 'welcome',
          role: 'assistant',
          content: welcomeMessage,
        },
      ])
      setWelcomed(true)
    }
  }, [open, welcomed, welcomeMessage])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || typing) return

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
    }
    const nextMessages = [...messages, userMsg]
    setMessages(nextMessages)
    setInput('')
    setTyping(true)

    const apiKey = getApiKey()
    if (!apiKey) {
      setTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content:
            "Sorry, I'm having trouble connecting. Please try again.",
        },
      ])
      return
    }

    const apiMessages = nextMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }))

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 500,
          system: buildSystemPrompt(businessName),
          messages: apiMessages,
        }),
      })

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`)
      }

      const data = (await res.json()) as {
        content?: { type: string; text?: string }[]
      }
      const reply =
        data.content?.find((c) => c.type === 'text')?.text?.trim() ||
        "Sorry, I didn't get a response. Please try again."

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: reply,
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content:
            "Sorry, I'm having trouble connecting. Please try again.",
        },
      ])
    } finally {
      setTyping(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      void sendMessage()
    }
  }

  const rootStyle = {
    '--axon-accent': accentColor,
    position: 'fixed' as const,
    bottom: 24,
    right: 24,
    zIndex: 2147483646,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  } as CSSProperties

  return (
    <>
      <style>{widgetStyles}</style>
      <div style={rootStyle}>
        {open && (
          <div
            role="dialog"
            aria-label="AXON AI chat"
            style={{
              position: 'absolute',
              bottom: 72,
              right: 0,
              width: 380,
              height: 520,
              backgroundColor: '#fff',
              borderRadius: 16,
              boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
              border: '1px solid #F3F4F6',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <header
              style={{
                background: HEADER_GRADIENT,
                color: '#fff',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0,
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: 0.3 }}>
                AXON AI
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span
                  style={{
                    fontSize: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 5,
                    opacity: 0.95,
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      backgroundColor: '#22C55E',
                      display: 'inline-block',
                    }}
                  />
                  Online
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close chat"
                  style={{
                    background: 'rgba(255,255,255,0.15)',
                    border: 'none',
                    borderRadius: 8,
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#fff',
                  }}
                >
                  <CloseIcon />
                </button>
              </div>
            </header>

            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                backgroundColor: '#fff',
              }}
            >
              {messages.map((msg) =>
                msg.role === 'assistant' ? (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      gap: 10,
                      alignItems: 'flex-start',
                      maxWidth: '88%',
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        backgroundColor: accentColor,
                        color: '#fff',
                        fontSize: 10,
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      AX
                    </div>
                    <div
                      style={{
                        backgroundColor: AI_BUBBLE_BG,
                        color: '#1F2937',
                        padding: '10px 14px',
                        borderRadius: 16,
                        fontSize: 14,
                        lineHeight: 1.5,
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: accentColor,
                        color: '#fff',
                        padding: '10px 14px',
                        borderRadius: 16,
                        fontSize: 14,
                        lineHeight: 1.5,
                        maxWidth: '80%',
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                ),
              )}
              {typing && <TypingIndicator accentColor={accentColor} />}
              <div ref={messagesEndRef} />
            </div>

            <div
              style={{
                borderTop: '1px solid #F3F4F6',
                padding: 12,
                display: 'flex',
                gap: 8,
                backgroundColor: '#fff',
                flexShrink: 0,
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                disabled={typing}
                style={{
                  flex: 1,
                  border: '1px solid #E5E7EB',
                  borderRadius: 10,
                  padding: '10px 14px',
                  fontSize: 14,
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
              <button
                type="button"
                className="axon-send-btn"
                onClick={() => void sendMessage()}
                disabled={!input.trim() || typing}
                aria-label="Send message"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 10,
                  border: 'none',
                  backgroundColor: accentColor,
                  cursor: input.trim() && !typing ? 'pointer' : 'not-allowed',
                  opacity: input.trim() && !typing ? 1 : 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <SendIcon />
              </button>
            </div>
          </div>
        )}

        <div className="axon-trigger-wrap">
          {!open && <span className="axon-pulse-ring" aria-hidden />}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close AXON AI' : 'Open AXON AI chat'}
            aria-expanded={open}
            style={{
              position: 'relative',
              zIndex: 1,
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: accentColor,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(99, 102, 241, 0.45)',
              transition: 'transform 0.2s ease',
            }}
          >
            <ChatIcon />
          </button>
        </div>
      </div>
    </>
  )
}
