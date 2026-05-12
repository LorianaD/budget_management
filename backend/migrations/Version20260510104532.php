<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260510104532 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE budget (id INT AUTO_INCREMENT NOT NULL, month VARCHAR(255) NOT NULL, year INT NOT NULL, planned_amount NUMERIC(10, 2) NOT NULL, user_id INT DEFAULT NULL, INDEX IDX_73F2F77BA76ED395 (user_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('CREATE TABLE budget_category (budget_id INT NOT NULL, category_id INT NOT NULL, INDEX IDX_D183486536ABA6B8 (budget_id), INDEX IDX_D183486512469DE2 (category_id), PRIMARY KEY (budget_id, category_id)) DEFAULT CHARACTER SET utf8mb4');
        $this->addSql('ALTER TABLE budget ADD CONSTRAINT FK_73F2F77BA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE budget_category ADD CONSTRAINT FK_D183486536ABA6B8 FOREIGN KEY (budget_id) REFERENCES budget (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE budget_category ADD CONSTRAINT FK_D183486512469DE2 FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE budget DROP FOREIGN KEY FK_73F2F77BA76ED395');
        $this->addSql('ALTER TABLE budget_category DROP FOREIGN KEY FK_D183486536ABA6B8');
        $this->addSql('ALTER TABLE budget_category DROP FOREIGN KEY FK_D183486512469DE2');
        $this->addSql('DROP TABLE budget');
        $this->addSql('DROP TABLE budget_category');
    }
}
