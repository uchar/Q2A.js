import { getStatistics } from '../../queries/statistic';

describe('tag statistics api', () => {
  test('if getStatistics work', async () => {
    const statistics = await getStatistics(null, { language: 'en' });
    expect(statistics.language).toBe('en');
    expect(statistics.tagsCount).toBeGreaterThanOrEqual(0);
    expect(statistics.blogPostsCount).toBeGreaterThanOrEqual(0);
    expect(statistics.allQuestionsCount).toBeGreaterThanOrEqual(0);
    expect(statistics.usersCount).toBeGreaterThanOrEqual(0);
  });
});
