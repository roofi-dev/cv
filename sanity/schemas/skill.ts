export default {
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'level',
      title: 'Proficiency Level',
      type: 'number',
      description: 'Skill level from 0 to 100',
      validation: (Rule: any) => Rule.required().min(0).max(100),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'Frontend' },
          { title: 'Backend', value: 'Backend' },
          { title: 'Database', value: 'Database' },
          { title: 'DevOps', value: 'DevOps' },
          { title: 'Design', value: 'Design' },
          { title: 'Tools', value: 'Tools' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Optional icon identifier',
    },
  ],
};
