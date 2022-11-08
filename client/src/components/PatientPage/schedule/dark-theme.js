//dark mode:
export const darkTheme = {
    primary: 'gold',
    secondary: 'slategrey',
    background: 'var(--color-background-raised)', // This should match the container background
    buttons: {
      disabled: {
        color: '#333',
        background: '#f0f0f0'
      },
      confirm: {
        color: '#fff',
        background: 'slategrey',
        hover: {
          color: '',
          background: 'lightslategrey'
        }
      }
    },
    feedback: {
      success: {
        color: '#29aba4'
      },
      failed: {
        color: '#eb7260'
      }
    }
  };