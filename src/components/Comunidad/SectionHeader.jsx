function SectionHeader({ title, subtitle }) {
  return (
    <div className="section-header">
      <div className="section-header-text">
        <h1 className="section-title">{title}</h1>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}

export default SectionHeader;