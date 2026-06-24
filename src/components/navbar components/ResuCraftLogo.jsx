import logoImg from '../../images/Header-logo.svg';

export default function ResuCraftLogo({ size = 110 }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0, background: 'transparent', borderRadius: 0 }}>
      <img
        src={logoImg}
        alt="ResuCraft Logo"
        className="resucraft-logo"
        style={{
          height: `${size}px`,
          width: 'auto',
          minWidth: `${size * 1.8}px`,
          maxHeight: `${size}px`,
          objectFit: 'contain',
          display: 'block',
          background: 'transparent',
          padding: '0',
          border: 'none',
          borderRadius: 0,
        }}
      />
    </div>
  );
}
