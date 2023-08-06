import React from 'react';
import { Entity } from 'draft-js';
import { ENTITY_TYPE, Icon } from 'draftail';

export function findDocumentEntities(contentBlock, callback) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return entityKey !== null && Entity.get(entityKey).getType() === ENTITY_TYPE.LINK;
  }, callback);
}

const Link = ({ entityKey, children }) => {
  const { url } = Entity.get(entityKey).getData();

  return (
    <span data-tooltip={entityKey} className="RichEditor-link">
      <Icon name={`icon-${url.indexOf('mailto:') !== -1 ? 'mail' : 'link'}`} />
      {children}
    </span>
  );
};

Link.propTypes = {
  entityKey: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
};

export default Link;
