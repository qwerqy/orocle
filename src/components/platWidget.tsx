import React from 'react';

const PlatWidget = (props: any) => {
  const { amountOfPlats, onClick } = props;
  const [isHovered, setisHovered] = React.useState(false);

  const messageHandler = (amount: number) => {
    let result: string;
    switch (amount) {
      case 0:
        result =
          'Nobody has given this article a Platinum trophy yet. Be the first!';
        break;
      case 1:
        result = 'person has given this article a Platinum trophy.';
        break;
      default:
        result = 'people have given this article a Platinum trophy.';
        break;
    }

    return result;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1.5rem',
        marginBottom: '2rem',
        backgroundColor: '#8FBCBB',
        borderRadius: '25px',
      }}
    >
      <p>If you find this article helpful, feel free to leave a Plat!</p>
      <a
        id="trophy-button"
        onClick={onClick}
        onMouseOver={() => setisHovered(true)}
      >
        <i
          style={{ fontSize: '2rem' }}
          className={`fas fa-trophy icon-buffer`}
        />
      </a>
      <br />
      <span>
        {amountOfPlats || ''} {messageHandler(amountOfPlats)}
      </span>
    </div>
  );
};

export default PlatWidget;
