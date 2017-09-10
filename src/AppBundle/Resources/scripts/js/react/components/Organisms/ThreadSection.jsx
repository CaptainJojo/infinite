import React, { PropTypes } from 'react';

import Button from 'components/Atoms/Button.jsx';

const renderThreadItems = (article, index) => {
  if (!article.id) {
    return null;
  }

  return (
    <li key={index}>
     {article.title}
    </li>
  );
};

const ThreadSection = ({
  articles = [],
  more = false,
  onButtonClick,
}) => (
  <div>
    <ul>
      {articles.map((article, index) => renderThreadItems(article, index))}
    </ul>
    {more && (
    <div>
      <Button
        text="Voir Plus"
        onClick={onButtonClick}
        ariaLabel="Afficher les contenus plus anciens"
      />
    </div>
    )}
  </div>
  );

ThreadSection.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object),
  more: PropTypes.bool,
  onButtonClick: PropTypes.func,
};

export default ThreadSection;
