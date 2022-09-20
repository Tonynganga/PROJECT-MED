# Generated by Django 3.2.5 on 2022-07-10 17:38

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Reviews',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('star', models.IntegerField(choices=[(1, 'Star 1'), (2, 'Star 2'), (3, 'Star 3'), (4, 'Star 4'), (5, 'Star 5')])),
                ('message', models.CharField(max_length=2000)),
                ('date_posted', models.DateTimeField()),
                ('reviewer', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]