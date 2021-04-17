import Show from '../../models/show.model';
import Character from '../../models/character.model';
import { createObjectTC } from '../../utils/createObjectTC';

const ShowTC = createObjectTC({ model: Show });

ShowTC.addFields({
  characters: {
      type: ['Character'],
      description: 'Sub items with a custom type',
      resolve: (source) => {
         return Character.find({ shows: {$in: [source._id]} }); 
      }
  }
});

const ShowQueryFields = {
  showById: ShowTC.getResolver('findById'),
  showByIds: ShowTC.getResolver('findByIds'),
  showOne: ShowTC.getResolver('findOne'),
  showMany: ShowTC.getResolver('findMany'),
  showCount: ShowTC.getResolver('count'),
};

const ShowMutationFields = {
  showCreateOne: ShowTC.getResolver('createOne'),
  showUpdateById: ShowTC.getResolver('updateById'),
  showUpdateOne: ShowTC.getResolver('updateOne'),
  showRemoveById: ShowTC.getResolver('removeById'),
  showRemoveOne: ShowTC.getResolver('removeOne'),
}


export { ShowTC, ShowQueryFields, ShowMutationFields }
