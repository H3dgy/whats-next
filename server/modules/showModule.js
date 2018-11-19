const showModule = {};
const db = require('../models/index');
const Op = db.Sequelize.Op;


showModule.findAll = async (ids) => {
  const result = await db.Show.findAll({
    where: { id: ids, backdrop_path: { [Op.ne]: null } }
  });
  return result
  .map(el => el.get({plain: true}));
}

showModule.getShowForUser = async (id, userId) => {
  const result = await db.Show.findOne({
    where: { id },
    include: [
      {
        model: db.Tracking,
        as: 'tracking',
        where: { userId: userId },
        required: false,
        attributes: ['status', 'rating', 'review']
      }
    ]
  });
  return result.get({plain: true});
};

showModule.createOrUpdateShow = async function createOrUpdateShow(id, findShowById = _findShowById, fetchCallback = _fetchCallback) {
  const localShow = await findShowById(id)
  if (!localShow) return showModule.createShow(id,false,fetchCallback);
  else if (!showModule.completeInfo(localShow)) return showModule.updateShowInfo(id,fetchCallback);
  else return localShow;
};

showModule.completeInfo = function completeInfo(show) {
  return (
    !!show.number_of_seasons &&
    !!show.similar.length &&
    !!show.recommendations.length
  );
}

showModule.createShow = async function createShow(id, recurse = false, fetchCallback = _fetchCallback, createShow = _createShow) {
  const key = '7ade3fee80ba277b71dfc6bc8b08cc50'
  const data = await fetchCallback(id, key);
  if (data && data.status_code !== 34) {
    const similar = (data.similar && data.similar.results) || [];
    const recommendations =
      (data.recommendations && data.recommendations.results) || [];
    const attrs = {
      id: data.id,
      name: data.name,
      backdrop_path: data.backdrop_path,
      poster_path: data.poster_path,
      number_of_seasons: data.number_of_seasons,
      vote_average: data.vote_average,
      overview: data.overview,
      similar: similar.map(el => el.id),
      recommendations: recommendations.map(el => el.id),
      genre_ids: data.genre_ids
    };
    const show = await createShow(attrs,false);
    if (recurse) {
      await createRelatedShows(attrs.similar);
      await createRelatedShows(attrs.recommendations);
    }
    return show;
  }
  else return [];
};

showModule.updateShowInfo = async function updateShowInfo(id, fetchCallback = _fetchCallback, findShowById = _findShowById, updateShow = _updateShow) {
  const show = await findShowById(id);
  const key = '7ade3fee80ba277b71dfc6bc8b08cc50';
  const data = await fetchCallback(id,key);
  const similar = (data.similar && data.similar.results) || [];
  const recommendations = (data.recommendations && data.recommendations.results) || [];
  const attrs = {
    number_of_seasons: data.number_of_seasons,
    similar: similar.map(el => el.id),
    recommendations: recommendations.map(el => el.id)
  };
  await updateShow(show, id, attrs)
  await createRelatedShows(attrs.similar, fetchCallback);
  await createRelatedShows(attrs.recommendations, fetchCallback);
  const showUpdated = await findShowById(id);
  return showUpdated;
};

showModule.createRelatedShow = async (showArrIds, fetchCallback) => {
  await Promise.all(
    showArrIds.map(async id => {
      const ss = await db.Show.findOne({ where: { id } });
      if (!ss) {
        await showModule.createShow(id, false, fetchCallback);
      }
    })
  );
};

showModule.searchShows = async function searchShows(term, searchShowsFetch = _searchShowsFetch) {
  const key = '7ade3fee80ba277b71dfc6bc8b08cc50'
  const results = await searchShowsFetch(key, term);
  return results.map(res => ({ id: res.id, name: res.name }));
};

_updateShow = async (show,id,attrs) => {
  await show.update(attrs, {where: {id}});
}

_fetchCallback = async (id, key) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${key}&append_to_response=similar,recommendations`
  )
    .then(data => data.json())
};

_searchShowsFetch = async (key, term) => {
  const result = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${key}&query=${term}`
  )
    .then(data => data.json())
    .then(data => data.results);
  return result;
}

_findShowById = async (id) => {
  return await db.Show.findByPk(id);
}

_createShow = async (attrs) => {
  return await db.Show.create(attrs);
}

module.exports = showModule;